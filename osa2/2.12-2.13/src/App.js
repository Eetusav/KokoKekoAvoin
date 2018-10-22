import React from 'react';
import axios from 'axios'
import Countries from './components/Countries';






class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      newName: '',
	  filter: '',
    }
  }

  
  
  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }
    handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }
  handleFilterChange = (event) =>{
	  console.log(event.target.value)
	  this.setState({ filter: event.target.value })
  }
componentDidMount() {
    console.log('did mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ countries: response.data })
      })
  }

  
  

  
  

  render() {
    return (
      <div>
        <form onSubmit={this.addNimi}>
          <div>
            find countries: 
			<input 
				value={this.state.filter}
				onChange={this.handleFilterChange}
				/>
          </div>
        </form>
        <h2>Numerot</h2>
        <div>
                    <Countries
                        countries={this.state.countries}
                        filter={this.state.filter}
                    />
                </div>
      </div>
    )
  }
}

export default App

