import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import loginForm from './components/loginForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      error: '',
      user: null,
      title: "",
      author: "",
      url: "",
      hideWhenVisible: '',
      showWhenVisible: 'none'

    }

  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      console.log('Käyttäjätunnus tai salasana virheellinen')
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }
  logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({ user: null })
  }
  createNewBlog = async (event) => {
    event.preventDefault()
    const newBlogToBeAdded = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
    console.log('try create new blog', newBlogToBeAdded)
    const blog = await blogService.create(newBlogToBeAdded)
    this.setState(prev => ({
      blogs: [...prev.blogs, blog],
      error: 'Uusi blogi ' + blog.title + ' lisätty. ' + 'Kirjoittajana ' + blog.author
    }))
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
  }

  handleBlogTitleChange = (event) => {
    this.setState({ title: event.target.value })
  }
  handleBlogAuthorChange = (event) => {
    this.setState({ author: event.target.value })
  }
  handleBlogUrlChange = (event) => {
    this.setState({ url: event.target.value })
  }
  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value })
  }
  componentDidMount() {
    console.log('mountataan')
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }


  render() {
    const kirjautuneena = () => (
      <div>Kirjautuneena käyttäjällä {this.state.user.username} <button onClick={this.logout}>logout</button></div>
    )
    const loginForm = () => {
      const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
      const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }
      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={e => this.setState({ loginVisible: true })}>log in</button>
          </div>
          <div style={showWhenVisible}>
            <div><h2>Kirjaudu</h2>
              <form onSubmit={this.login}>
                <div>
                  käyttäjätunnus
        <input
                    type="text"
                    value={this.state.username}
                    onChange={this.handleUsernameChange}
                  />
                </div>
                <div>
                  salasana
        <input
                    type="password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                </div>
                <button type="submit">kirjaudu</button>
              </form><button onClick={e => this.setState({ loginVisible: false })}>cancel</button></div> </div>

        </div>
      )
    }
    const blogForm = () => (
      <form onSubmit={this.createNewBlog}>
        <h2>create new</h2>
        <div>Title
        <input type="text" value={this.state.title} onChange={this.handleBlogTitleChange}></input>
        </div>
        <div>
          author
        <input
            type="text"
            value={this.state.author}
            onChange={this.handleBlogAuthorChange}
          />
        </div>
        <div>
          url
        <input
            type="text"
            value={this.state.url}
            onChange={this.handleBlogUrlChange}
          />
        </div>
        <button type="submit">lisää blogi</button>
      </form>
    )
    return (
      <div>
        {this.state.user === null && loginForm()}
        {this.state.user !== null && kirjautuneena()}
        <Notification message={this.state.error} />
        <h2>blogs</h2>
        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
        )}
        {blogForm()}
      </div>

    );
  }
}

export default App;
