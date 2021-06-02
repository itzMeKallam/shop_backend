const jwt = require('jsonwebtoken')
const Users = require('../../../model/admin/users')

module.exports=(req, res, next)=>{
    const authHeader = req.get('Authorization')
    if(!authHeader){
        const error = new Error('Not Authenticated')
        error.statusCode = 401
        throw error
    } 
    const token = authHeader.split(' ')[1]
    let decodedToken
    try{
        decodedToken = jwt.verify(token , 'kocinakovanigamakorisaparevaparaparahey')
    } catch(err){
        err.data = token
        err.statusCode = 500
        throw err
    }

    if(!decodedToken){
        const error = new Error('Not Authenticated')
        error.statusCode = 401
        throw error
    }

    req.userId = decodedToken.userId
    return Users.findById(req.userId).then(user=>{
        if(!user){
            return Promise.reject('Email address already exist')
        }
        return next()
    }).catch(error=>{
        return next()
    })
    
}