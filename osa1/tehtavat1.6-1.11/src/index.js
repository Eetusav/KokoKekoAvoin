import React from 'react';
import ReactDOM from 'react-dom';


const Button = ({ name, onClick }) => (
    <button name={name} onClick={onClick}>{name}</button>
)

const Otsikko = ({otsikko}) => (
 <h1>{otsikko}</h1>
)

const Statistic = ({ name, value }) => (
    <tr>
        <td>{name}</td><td>{value}</td>
    </tr>
)

class Statistics extends React.Component {

    countTotal = () => {
        return this.props.palauteTyypit.reduce((prev, { name }) =>
            prev + this.props.counters[name]
        , 0)
    }

    countAverage = (yhteensa) => {
        if (yhteensa === 0) {
            return 0
        }

        const summa = this.props.palauteTyypit.reduce((prev, { name, value }) => (
            prev + this.props.counters[name] * value
        ), 0)

        return (summa / yhteensa).toFixed(1)
    }

    countProportions = (yhteensa) => {
        return this.props.palauteTyypit.reduce((proportions, { name }) => ({
            ...proportions,
            [name]: (this.props.counters[name] / yhteensa *100).toFixed(1)|| 0
        }), {})
    }

    render() {
        const { counters, palauteTyypit } = this.props
        const yhteensa = this.countTotal()
		const proportionss = (this.countProportions(this.countTotal()).hyvä)
		console.log('this.props sisältö:',this.props)
		console.log('yhteensa sisältö:', yhteensa)
		console.log('countProportions ', (this.countProportions(yhteensa).neutraali ))
        if (yhteensa === 0) {
            return 'ei yhtään palautetta annettu'
        }
        return (
            <table>
                <tbody>
                    {palauteTyypit.map(({ name }) => (
                        <Statistic key={name} name={name} value={counters[name]} />
                    ))}
                    <Statistic name="keskiarvo" value={this.countAverage(yhteensa)} />
                    <Statistic name="positiivisia" value={`${proportionss} %`} />
                </tbody>
            </table>
        )
    }
}

class App extends React.Component {

    static palauteTyypit = [
        {
            name: 'hyvä',
            value: 1
        },
        {
            name: 'neutraali',
            value: 0
        },
        {
            name: 'huono',
            value: -1
        }
    ]

    state = App.palauteTyypit.reduce( (state, {name}) => ({
		...state,[name]: 0}), {} )

    kasvata = ({ target: { name }}) => (
        this.setState((prevState) => ({ [name]: prevState[name] + 1 }))
    )
	

    render() {
		
        return (
            <div>
                <Otsikko otsikko={'anna palautetta'}/>
                {App.palauteTyypit.map(({ name }) => (
                    <Button key={name} name={name} onClick={this.kasvata} />
                ))}
                <Otsikko otsikko={'statistiikka'}/>
                <Statistics counters={this.state} palauteTyypit={App.palauteTyypit} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));