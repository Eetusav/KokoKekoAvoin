import React from 'react'
import ReactDOM from 'react-dom'


const Button = ({ name, onClick }) => (
    <button name={name} onClick={onClick}>{name}</button>
)


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
	   pisteet: [0, 0, 0, 0, 0, 0]
	  
    }
  }
 kasvata = () => (
        this.setState((prevState) => ({ selected: Math.floor(Math.random() * 5) }))
    )
vote = () => (
this.state.pisteet[this.state.selected] +=1
)

  
  render() {
const taulukonMaxinIndeksi = this.state.pisteet.indexOf(Math.max(...this.state.pisteet))
	  console.log('selected arvo:', this.state.selected)
	  console.log('pisteet:', this.state.pisteet)
	  console.log('taulukon maximin indeksi ', this.state.pisteet.indexOf(Math.max(...this.state.pisteet)))
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
		<p>
		<Button key={'next anecdote'} name={'next anecdote'} onClick={this.kasvata} />
		<Button key={'vote'} name={'vote'} onClick={this.vote} />
		</p>
		<h1>anecdote with most votes</h1>
		<p>{this.props.anecdotes[taulukonMaxinIndeksi]}</p>
		<p>has {this.state.pisteet[taulukonMaxinIndeksi]} votes</p>
      </div>
    )
  }
}



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
