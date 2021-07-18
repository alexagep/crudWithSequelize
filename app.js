const express = require('express');

const { sequelize, User, Post } = require('./models')
const app = express()
app.use(express.json())


app.post('/users', async(req, res) => {
    const { name, email, role } = req.body
    try {
        let user = await User.create({ name, email, role });

        return res.json(user)
    } catch (err) {
        return res.status(400).json({err})
    }
})


app.get('/users', async(req, res) => {
    try {
        const users = await User.findAll()

        return res.json(users)
    } catch (err) {
        return res.status(500).json({err: 'something went wrong!'})
    }
})


app.get('/user/:uuid', async(req, res) => {
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({ 
            where: { uuid },
            include: 'posts'
        })

        return res.json(user)
    } catch (err) {
        return res.status(500).json({err: 'something went wrong!'})
    }
})


app.post('/posts', async(req, res) => {
    const { body, userUuid } = req.body
    try {
        const user = await User.findOne({ where: { uuid: userUuid }})
        const post = await Post.create({ body, userId: user.id })

        return res.json(post)
    } catch (err) {
        return res.status(500).json({err: 'something went wrong!'})
    }
})


app.get('/posts', async(req, res) => {
    try {
        const posts = await Post.findAll({ include: 'user' })

        return res.json(posts)
    } catch (err) {
        return res.status(500).json({err: 'something went wrong!'})
    }
})

app.delete('/user/:uuid', async(req, res) => {
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({ where: { uuid }})

        await user.destroy()

        return res.json({msg: 'user deleted' })
    } catch (err) {
        return res.status(500).json({err: 'something went wrong!'})
    }
})


app.put('/user/:uuid', async(req, res) => {
    const uuid = req.params.uuid
    const { name, email, role } = req.body
    try {
        const user = await User.findOne({ where: { uuid }})

        user.name = name;
        user.email = email;
        user.role = role;

        await user.save()

        return res.json(user)
    } catch (err) {
        return res.status(500).json({err: 'something went wrong!'})
    }
})



const PORT = process.env.PORT || 3000;

app.listen(PORT, async() => {
    console.log(`server is running at ${PORT}`);
    await sequelize.authenticate()
    console.log('Database Connected!');
})