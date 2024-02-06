require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/Moviedb')

app.post('/register', async (req, res) => {
    try {
        const getUserDetails = await UserModel.find({ $or: [{email: req.body.email}, {username: req.body.username  }] })
        if (getUserDetails.length !==0) {
            res.send({isRegisteredSuccessful: false,message:"User Already Registered"})
        }
        else {
            const hashPassword = await bcrypt.hash(req.body.password, 10)
            const userDetails = new UserModel({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            })
            const saveDetails = await userDetails.save()
            res.send({isRegisteredSuccessful: true, message: "Successfully Registed!!" })
        }
    }
    catch (error) {
        res.send({message:error.message})
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const userDetails = await UserModel.findOne({ username: username })

    try {
        if (userDetails === null) {
            res.status(401).send({ok:false,errorMsg: "User Not Registered"})
        }
        else {
            if (password === userDetails.password) {
                const accessToken = jwt.sign(req.body, process.env.ACCESS_TOKEN)
                res.send({ jwtToken: accessToken })
            }
            else {
                res.status(401).send({ok:false,errorMsg:"Password doesn't match"})
            }
        }
    }
    catch (e) {
        res.send("error:" + e.message)
    }
})

const PORT = 5000
app.listen(PORT, () => console.log(`Server Listening on the Port : ${PORT}`))