const mongoose = require('mongoose')
const url = 'mongodb://dbuser:Heinakuu11@ds235251.mlab.com:35251/fullstack-persons'

mongoose.connect(url)

//const Person = mongoose.model('Person', {
//    name: String,
//    number: String
//})

//const person = new Person({
//    name: 'Pekka Pätkä',
//    number: '040-1234567'
//})

const nimi = process.argv[2]
const numero = process.argv[3]
if (nimi !== undefined || numero !== undefined){
    const person = new Person({
        name: nimi,
        number: numero
    })
    person.save().then(response => {
    console.log('lisätään henkilö', nimi, ' numero ', numero, ' luetteloon')
    mongoose.connection.close()
})
}
if (nimi === undefined){
console.log('puhelinluettelo:')
Person
  .find({})
  .then(result => {
    result.forEach(person => {
      console.log(person.name, ' ', person.number)
    })
    mongoose.connection.close()
  })
}