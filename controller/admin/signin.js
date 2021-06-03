const { validationResult } = require('express-validator'); 
const Users = require('../../model/admin/users')
const jwt = require('jsonwebtoken')


exports.adminPostSignin =(req,res, next)=>{
    const email = req.body.email
    return Users.findOne({email: email}).then(user=>{
        const token = jwt.sign({
            userId: user._id.toString()
          }, 'kocinakovanigamakorisaparevaparaparahey')
          res.status(200).json({ token: token})
    }).catch(error=>{
        if(!error.statusCode){
          error.statusCode = 500;
        }
        next(error)
      })

    
}