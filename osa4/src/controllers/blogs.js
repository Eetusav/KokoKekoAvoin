const blogsRouter = require('express').Router()
const { Blog } = require("../models/blog");
const { User } = require("../models/user")
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { _id: 1, username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  try {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (request.body.title === undefined || request.body.url === undefined) {
      return response.status(400).json({ error: "Title or url missing" })
    }
    const user = await User.findById(decodedToken.id)


    const blog = new Blog({
      ...request.body,
      user: user._id
    });
    const result = await blog.save();
    user.blogs = user.blogs.concat(blog._id)
    response.status(201).json(result);

  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
});


blogsRouter.delete("/:id", async (request, response) => {
  //await Blog.findByIdAndRemove(request.params.id)
  try {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    const blogi = await Blog.findById(request.params.id);
    if (!blogi) {
      response.status(204).end()
    }
    if (blogi.user.toString() !== user._id){
      return response.status(400).json({ error: "Vain blogin lisääjä voi poistaa lisäämänsä blogin"})
    }
    await blog.remove()
    response.status(204).end()
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }

})
blogsRouter.patch("/:id", async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.status(204).end()
})

module.exports = blogsRouter;
