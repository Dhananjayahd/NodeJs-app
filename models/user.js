const mongoose = require('mongoose')
const schema = mongoose.Schema

const userschema =new schema({
    user:{
        type : String,
        default:true
    },
    email:{
        type:String,
        default:true
    },
    password:{
        type:String,
        default:true
    }
})

module.exports = person = mongoose.model("registration",userschema)