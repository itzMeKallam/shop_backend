const Users = require('../../../model/admin/users')
const validator = require('validator');

exports.adminPostSignupMiddleWare=(body)=>{
    return [
    body('username')
    .custom((value, {req})=>{
        if(validator.isEmpty(value)){
            return Promise.reject('Username is required')
        }
        value = validator.trim(value)
        return (req.body.username = value)
    }),
    body('email')
    .custom((value, {req}) =>{
        if(!validator.isEmail(value)){
            return Promise.reject('Invalid Email')
        }
        value = value.toLowerCase()
        return Users.findOne({email: value}).then(user=>{
            if(user){
                return Promise.reject('Email address already exist')
            }
            return (req.body.email = value)
        })
    }),
    body('password')
    .custom((value, {req})=>{
        console.log(value)
        if(validator.isEmpty(value)){
            return Promise.reject('Password is required')
        }
        if(!validator.isLength(value, {min:5})){
            return Promise.reject('Password length should be min 5 char')
        }
        return (req.body.password = value)
    }),
    body('confirmPassword')
    .custom((value, {req})=>{
        if(validator.isEmpty(value)){
            return Promise.reject('Confirm Password is required')
        }
        if(!validator.isLength(value, {min:5})){
            return Promise.reject('Confirm Password length should be min 5 char')
        }
        if(value !== req.body.password){
            return Promise.reject('Passwords haven`t matched')
        }
        return (req.body.confirmPassword = value)

    })
]
}


