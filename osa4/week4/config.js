//if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
//}

let mongoUrl = process.env.MONGODB_URI
let testMongoUrl = 'mongodb://dbuser:Heinakuu11@ds143593.mlab.com:43593/blog-dev'
let secret = process.env.secret
module.exports = {
  mongoUrl,
  testMongoUrl,
  secret
};