import React from "react"

const Numbers = ({ persons, filter, deletePerson }) => {
    return (
        <table>
            <tbody>
                <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
            </tbody>
        </table>
    )
}

const Persons = ({ persons, filter, deletePerson }) => {
    return persons
        .filter(person => person.name.match(filter))
        .map(person => <Person key={person.name} person={person} deletePerson={deletePerson} />)
}

const Person = ({ person, deletePerson }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>     
			<td>
                <button onClick={deletePerson(person.id, person.name)}>Poista</button>
            </td>			
        </tr>
    )
}

export default Numbers
