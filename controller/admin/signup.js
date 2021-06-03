const { validationResult } = require('express-validator');
const Users = require('../../model/admin/users')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.adminPostSignup =(req,res, next)=>{
    const email = req.body.email
    const password = req.body.password
    const username = req.body.username 

    bcryptjs.hash(password, 12).then(hp=>{
        const user =new Users({
            email: email,
            password: hp,
            username: username
        })
        return user.save()
    }).then(result=>{
      const token = jwt.sign({
        userId: result._id.toString()
      }, 'kocinakovanigamakorisaparevaparaparahey')
      res.status(200).json({ token: token})
    }).catch(error=>{
        if(!error.statusCode){
          error.statusCode = 500;
        }
        next(error)
      })
}