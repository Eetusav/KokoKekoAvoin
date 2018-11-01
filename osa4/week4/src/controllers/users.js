const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const { User } = require('../models/user')

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        if (body.password.length < 3) {
            response.status(400).json({ error: 'Salasana liian lyhyt...' })
        }
        const existingUser = await User.find({ username: body.username })
        if (existingUser.length > 0) {
            return response.status(400).json({ error: 'username must be unique' })
        }
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
        const isAdult = body.adult
        if (isAdult === undefined) {
            isAdult = true
        }
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
            adult: Boolean(isAdult)
        })

        const savedUser = await user.save()

        response.json(savedUser)
    } catch (exception) {
        if (exception.name === "BulkWriteError") {
            response.status(500).json({ error: 'Kyseinen käyttäjänimi on jo käytössä...' })
        } else {
            console.log(exception)
            response.status(500).json({ error: 'something went wrong...' })
        }
    }
})

usersRouter.get('/', async (request, response) => {
    response.json(await User.find({}).select("-passwordHash").populate("blogs", {user: 0}))
})

module.exports = usersRouter 