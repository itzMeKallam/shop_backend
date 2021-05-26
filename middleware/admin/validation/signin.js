const Users = require('../../../model/admin/users')
const bcrypt = require('bcryptjs')
exports.adminPostSigninMiddleWare=(body)=>{
    let hashPassword
    return [
    body('email').isEmail().normalizeEmail().withMessage('Please Enter a valid E-mail')
    .custom((value, {req}) =>{
        return Users.findOne({email: value}).then(user=>{
            if(!user){
                return Promise.reject('Invalid email')
            }

            hashPassword = user.password
        })
    }),
    body('password')
    .custom((value, {req})=>{
        bcrypt.compare(value, hashPassword).then(matched=>{
            if(!matched){
                return Promise.reject('Invalid password')
            }
        })
        return true
    })
]
}


