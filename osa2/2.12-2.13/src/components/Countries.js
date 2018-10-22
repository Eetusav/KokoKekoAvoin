import React from "react";

const Countries = ({ countries, filter}) => {


    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().match(filter.toLowerCase())
    );

    if (filteredCountries.length === 1) {
        return <CountryDetails country={filteredCountries[0]} />;
    } else if (filteredCountries.length === 0) {
        return <div>Ei yhtään maita</div>;
    } else if (filteredCountries.length > 10) {
        return <div>Yli 10 maata. Tarkenna filtteriä</div>;
    } else {
        return (
            <CountryList
                filteredCountries={filteredCountries}
                
            />
        );
    }
};

const CountryDetails = ({ country }) => {
    return (
        <div>
            <h2>
                {country.name} {country.nativeName}
            </h2>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <img width="500" src={country.flag} alt={country.name} />
        </div>
    );
};

const CountryList = ({ filteredCountries }) => {
    return (
        <div>
            {filteredCountries.map(country => (
                <CountryName
                    key={country.name}
                    country={country}
                    
                />
            ))}
        </div>
    );
};

const CountryName = ({ country }) => {
    return <div>{country.name}</div>;
};

export default Countries;
