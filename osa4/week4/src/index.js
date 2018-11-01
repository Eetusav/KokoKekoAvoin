const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
const config = require("../config");

mongoose.connect(config.mongoUrl);

const server = http.createServer(app).listen(3006, () => {
  console.log(`Server running on port 3006`);
});