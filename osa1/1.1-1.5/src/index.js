import React from 'react'
import ReactDOM from 'react-dom'

  const Otsikko = ({kurssi}) => (
    <h1>{kurssi}</h1>
)
  const Osa = ({osa, tehtavia}) => (
	<p>{osa} {tehtavia}</p>
)
  const Sisalto = ({osat}) => (
	osat.map(osa => (
	<Osa key={osa.nimi} osa={osa.nimi} tehtavia={osa.tehtavia} />
	))
)
const Yhteensa = ({ osat }) => (
    <p>yhteensä {osat.map(osaListassa => osaListassa.tehtavia).reduce((a, b) => a + b)} tehtävää</p>
)
console.log([1, 2, 3, 4].reduce((a, b) => a + b))




const App = () => {
  const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
				nimi: 'Reactin perusteet',
                tehtavia: 10
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            }
        ]
    }

  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)