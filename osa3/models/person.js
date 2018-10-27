const mongoose = require('mongoose')
//const url = process.env.MONGODB_URI
const Schema = mongoose.Schema
if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
  }
  
  const url = process.env.MONGODB_URI
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