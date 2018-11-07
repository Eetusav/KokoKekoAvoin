import React from 'react';



class App extends React.Component {
  klik = (nappi, anecdote) => () => {
    console.log('Nappia painettu', nappi)
    //reducer(palautteet, nappi)
    this.props.store.dispatch({type: nappi, anecdote: anecdote.id})
    console.log('store', this.props.store.getState())
  }


  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.klik('VOTE', anecdote)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form>
          <div><input /></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App