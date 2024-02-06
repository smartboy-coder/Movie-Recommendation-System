const mongoose = require('mongoose')

const UserDetailsSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: ()=> Date.now(),
    }
})

const UserModel = mongoose.model('users',UserDetailsSchema)

module.exports = UserModel