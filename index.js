const express = require('express')
const app =express()
const bodyparser=require('body-parser')
const path=require('path')
const mongoose = require('mongoose')
const router = express.Router()
const port=process.env.PORT||3000

app.use(bodyparser.urlencoded({extended:false}))
app.use(express.static(__dirname+'/public'))
app.use(bodyparser.json())
app.set('views',path.join(__dirname,'/views')) 
app.set('view engine','ejs')

const auth = require('./routes/api/auth')

const db =require('./setup/myurl').mongourl
mongoose
.connect(db)
.then(()=>{
    console.log(' connection done')
})
.catch(err => console.log(err))

app.get('/',(req,res)=>{
    res.redirect('/signup')
})

app.get('/signin',(req,res)=>{
    res.render('login')
})
app.get('/signup',(req,res)=>{
    res.render('register')
})

app.use('/api/auth',auth)

app.listen(port)