const Users = require('../../../model/admin/users')
const bcrypt = require('bcryptjs')
const validator = require('validator')
exports.adminPostSigninMiddleWare=(body)=>{
    let hashPassword
    return [
        body('email') 
        .custom((value, {req}) =>{
            if(!validator.isEmail(value)){ 
                return Promise.reject('Invalid Email')
            }
            value = value.toLowerCase()
            return Users.findOne({email: value}).then(user=>{
                if(!user){
                    return Promise.reject('Email doesn`t exist')
                }
                hashPassword = user.password
                return (req.body.email = value)
            })
        }),
    body('password')
    .custom((value, {req})=>{
        return bcrypt.compare(value, hashPassword).then(matched=>{
            if(!matched){
                return Promise.reject('Invalid password')
            }
            return (req.body.password = value)
        })
    })
]
}


