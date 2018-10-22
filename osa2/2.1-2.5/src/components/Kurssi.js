import React from 'react'


const Kurssi = ({kurssi}) => {
return(
<div>
		<Otsikko nimi={kurssi.nimi}/>
		<Sisalto osat={kurssi.osat}/>
		<Yhteensa osat={kurssi.osat}/>
</div>
)
}


  const Otsikko = ({nimi}) => (
    <h1>{nimi}</h1>
)
  const Osa = ({osa}) => (
	<p>{osa.nimi} {osa.tehtavia}</p>
)
  const Sisalto = ({osat}) => {
    return (
        osat.map(osa => <Osa key={osa.id} osa={osa} />)
    )
}
const Yhteensa = ({ osat }) => (
    <p>yhteensä {osat.map(osaListassa => osaListassa.tehtavia).reduce((a, b) => a + b)} tehtävää</p>
)



export default Kurssi;