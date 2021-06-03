const Users = require('../../../model/admin/users')
const bcrypt = require('bcryptjs')
const validator = require('validator')
exports.adminPostSigninMiddleWare=(req, res, next)=>{
    let email = req.body.email
    let password = req.body.password

    // Email
    if(!validator.isEmail(email)){
        return res.status(422).json({message: 'Validation failed', data: 'Invalid Email'})
    }
    email = email.toLowerCase()

    return Users.findOne({email}).then(user=>{
        if(!user){
            return res.status(422).json({message: 'Validation failed', data: 'Email Id doesn`t exist'})
        }
        return user.password
    }).then(hashPassword=>{
        // Passoword
        return bcrypt.compare(password, hashPassword)
    }).then(matched=>{
        if(!matched){
            return res.status(422).json({message: 'Validation failed', data: 'Wrong Password'})
        }
        req.email = email
        req.password = password
        return next()
    }).catch(error=>{
        return res.status(500).json({message: 'Validation failed', data: 'Unable to reach server'})
    })

   
}


