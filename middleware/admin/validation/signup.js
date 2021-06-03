const Users = require('../../../model/admin/users')
const validator = require('validator');

exports.adminPostSignupMiddleWare=(req, res, next)=>{
    let username= req.body.username
    let email = req.body.email
    let password = req.body.password
    let confirmPassword = req.body.confirmPassword

    // username

    if(validator.isEmpty(username)){
        return res.status(422).json({message: 'Validation failed', data: 'Username is required'})
    }
    username = validator.trim(username)

    //email
    if(validator.isEmpty(email)){
        return res.status(422).json({message: 'Validation failed', data: 'Email is required'})
    }
    if(!validator.isEmail(email)){
        return res.status(422).json({message: 'Validation failed', data: 'Invalid Email'})
    }
    email = validator.trim(email.toLowerCase())
    return Users.findOne({email}).then(user=>{
        if(user){
            return res.status(422).json({message: 'Validation failed', data: 'User already exist, please login'})
        }
        return
    }).then(()=>{

        // Password
        if(validator.isEmpty(password)){
            return res.status(422).json({message: 'Validation failed', data: 'Password is required'})
        }
        if(!validator.isLength(password, {min:5})){
            return res.status(422).json({message: 'Validation failed', data: 'Password length should be min 5 char'})
        }

        return
    }).then(()=>{
        // confirm password
        if(validator.isEmpty(confirmPassword)){
            return res.status(422).json({message: 'Validation failed', data: 'Confirm password is required'})
        }
        if(confirmPassword !== password){
            return res.status(422).json({message: 'Validation failed', data: 'Passwords haven`t matched'})
        }

        req.username = username
        req.email = email
        req.password = password
        req.confirmPassword = confirmPassword

        return next()
    }).catch(error=>{
        return res.status(500).json({message: 'Validation failed', data: 'Unable to reach server'})
    })

}


