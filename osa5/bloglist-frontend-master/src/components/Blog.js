import React from "react";
class Blog extends React.PureComponent {
   
  handleClick = () => {
    console.log('blogia painettu')
  };
  handleLike = () => {
    console.log('liketetty')
    this.props.onLike(this.props.blog)
  }

  render() {
    const a = 1
    const { blog } = this.props;
    return (
      <div>
        <div onClick={this.handleClick}>
          {blog.title} {blog.author}
        </div>
        
          <div>
            <div>
              <a href={blog.url}>{blog.url}</a>
            </div>
            <div>
              {blog.likes} likes <button type="button" onClick={this.handleLike}>like</button>
            </div>
            
          </div>
        
      </div>
    );
  }
}

export default Blog;