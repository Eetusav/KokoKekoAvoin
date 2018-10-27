const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

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