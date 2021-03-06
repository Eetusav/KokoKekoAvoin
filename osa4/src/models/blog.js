const mongoose = require("mongoose");

const Blog = mongoose.model("Blog", {
  title: {type: String, required: true},
  author: String,
  url: {type: String, required: true},
  likes: {type: Number, default: 0},
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = { Blog };
