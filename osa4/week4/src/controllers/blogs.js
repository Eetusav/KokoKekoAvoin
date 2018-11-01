const blogsRouter = require('express').Router()
const { Blog } = require("../models/blog");
const { User } = require("../models/user")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {_id: 1, username: 1, name: 1});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  if (request.body.title === undefined || request.body.url === undefined){
    return response.status(400).json({error: "Title or url missing"})
  }
  const user = await User.findOne({})

  const blog = new Blog({
    ...request.body,
    user: user._id
  });
  const result = await blog.save();
  response.status(201).json(result);
});
blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
blogsRouter.patch("/:id", async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.status(204).end()
})

module.exports = blogsRouter;
