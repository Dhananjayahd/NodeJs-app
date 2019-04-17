const express = require('express')
const mongoose = require('mongoose')
const app = express()
const router = express.Router()
const bcrypt = require('bcryptjs')

const person = require('../../models/user')

//@type         post
//@route        api/auth/registraton
//des           for registration
//access         public
router.post('/register',(req,res)=>{
    person.findOne({email:req.body.email})
    .then(personfind=>{
        if(personfind){
            res.status(400).json({emailerror:'user as already registered'})
        }
        else{
            const newuser =new person({
                user:req.body.user,
                email:req.body.email,
                password:req.body.password
            })
        bcrypt.genSalt(10, (err, salt)=> {
            bcrypt.hash(newuser.password, salt, (err, hash)=> {
                if(err) throw err
                newuser.password=hash
                newuser.save()
                .then(Person=>res.json(newuser))
                .catch(err => console.log(err))
            });
        });
    }
 }).catch(err=>console.log(err))
})
 //@type         post
//@route        api/auth/login
//des           for login
//access         public
 router.post('/login',(req,res)=>{
     email=req.body.email,
     password=req.body.password
     person.findOne({email:req.body.email})
     .then(userfind=>{
         if(!userfind){
             res.status(400).json({mes:'user has to register'})
         }
         bcrypt.compare(password,userfind.password)
         .then(compared =>{
             if(compared){
                 res.json({msg:"user has succesfully loggedin"})
             }
             else{
                 res.json({msg:"password incorrect"})
             }
         })
         .catch(err => console.log(err))
     })
     .catch(err => console.log(err))
 })


module.exports=router