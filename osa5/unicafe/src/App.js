import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import reducer from './reducer'
import {createStore} from 'redux'
import ReactDOM from 'react-dom';

const Statistiikka = ({good, ok, bad, zero}) => {
  const palautteita = good + ok + bad
  const avg = (good - bad)/palautteita
  const pos = (good + ok)/palautteita
  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{avg}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{pos}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={zero}>nollaa tilasto</button>
    </div >
  )
}


const store = createStore(reducer)

class App extends Component {

  

  klik = (nappi) => () => {
    //console.log('Nappia painettu', nappi)
    //reducer(palautteet, nappi)
    store.dispatch({type: nappi})
    console.log('store', store.getState())
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka good={store.getState().good} ok={store.getState().ok} bad={store.getState().bad} zero={this.klik('ZERO')} />
      </div>
    )
  }
}
const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

export default App;
