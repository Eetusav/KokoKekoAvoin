const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("../config.js")



const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require('./controllers/login')

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);
app.use('/api/login', loginRouter)



module.exports = app