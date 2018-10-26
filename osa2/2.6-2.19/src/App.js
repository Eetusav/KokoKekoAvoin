import React from 'react';
import axios from 'axios';
import Numbers from './components/Numbers';
import Filtteri from './components/Filtteri';
import Service from "./services/persons"
import Notification from "./components/Notification"



class App extends React.Component {
    state = {
      persons: [],
      newName: 'uusi nimi...',
      newNumber: 'uusi numero...',
      filter: '',
      error: ''
    }
  

  componentDidMount() {
    console.log('did mount')
    axios
      .get('/api/persons')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response.data })
      })
  }



  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }
  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }
  handleFilterChange = (event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value })
  }




  addNimi = (event) => {
    event.preventDefault()
    console.log('nappia painettu')
    console.log(event.target)
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    const personInList = this.state.persons.find(
      person => person.name === this.state.newName
    )


    if (personInList) {
      if (window.confirm(personObject.name + " on jo lisättynä. Korvataanko vanha numero uudella?")) {
        Service.update(personInList._id, personObject).then(response => {
          this.setState(prevState => ({  
            newName: 'Uusi nimi',
            newNumber: 'Uusi numero...',          
            error: 'Henkilön päivitys onnistui.',
            persons: prevState.persons.map(
              person => (person._id === personObject.id ? personObject : person)
            )
                
        }))
        }).catch(error => {
          console.log("Muutettavaksi yritettävän henkilön tiedot on jo poistettu.")
          this.setState({
            error: 'Muutettavaksi yritettävän henkilön tiedot on jo poistettu.'
          })
        })


        
        console.log('Listassa on jo henkilö', personInList.name)
      } else {
        alert('Numeroa ei päivitetty.')
      }


    } else {
      const persons = this.state.persons.concat(personObject)
      this.setState({
        persons: persons,
        newName: 'uusi nimi...',
        error: 'Uuden henkilön lisääminen onnistui.',
        newNumber: 'uusi numero...'
      })
      Service.create(personObject)

    }
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)


  }

  deletePerson = (id, name) => {
    return () => {
      if (window.confirm("Poistetaanko henkilö nimeltään: " + name)) {
        Service.remove(id)
        console.log("ID: ", id)
        
        Service.remove(id).then(response => {
          this.setState(prevState => ({            
              error: 'Henkilön poisto onnistui.',
              persons: prevState.persons.filter(person => person._id !== id)            
          }))
        })
          .catch(error => {
            console.log("Henkilön poistossa meni jotain vikaan")
            this.setState({
              error: 'Henkilön poistossa meni jotain vikaan.'
             // persons: this.state.persons.filter(person => person.id !== id)
            })
          })
      }
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)

    }
  }





  render() {
    return (
      <div>
        <h2>Filtteröi tuloksia</h2>
        <Filtteri filtteri={this.state.filter} handleFilterChange={this.handleFilterChange} />
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.error} />
        <form onSubmit={this.addNimi}>
          <div>
            nimi:
			<input
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            numero:
			<input
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <Numbers
          persons={this.state.persons}
          filter={this.state.filter}
          deletePerson={this.deletePerson}
        />
      </div>
    )
  }
}

export default App

