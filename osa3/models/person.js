const mongoose = require('mongoose')
const url = 'mongodb://dbuser:Heinakuu11@ds235251.mlab.com:35251/fullstack-persons'
const Schema = mongoose.Schema
mongoose.connect(url)

//const Person = mongoose.model('Person', {
//    name: String,
//    number: String
//})


const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person