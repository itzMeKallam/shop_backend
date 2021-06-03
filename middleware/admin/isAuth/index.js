const jwt = require('jsonwebtoken')
const Users = require('../../../model/admin/users')

module.exports=(req, res, next)=>{
    const authHeader = req.get('Authorization')
    if(!authHeader){
        return res.status(401).json({message: 'UnAuthorised', data: 'Recognized unauthorized operation, please login again'})
    } 
    const token = authHeader.split(' ')[1]
    let decodedToken
    try{
        decodedToken = jwt.verify(token , 'kocinakovanigamakorisaparevaparaparahey')
    } catch(err){
        return res.status(500).json({message: 'Unhandled error', data: 'Sorry for the inconvinence, please login again'})
    }

    if(!decodedToken){
        return res.status(401).json({message: 'UnAuthorised', data: 'Recognized unauthorized operation, please login again'})
    }

    req.userId = decodedToken.userId
    return Users.findById(req.userId).then(user=>{
        if(!user){
            return res.status(401).json({message: 'UnAuthorised', data: 'Recognized unauthorized operation, please login again'})
        }
        return next()
    }).catch(error=>{
        return res.status(500).json({message: 'can`t reach server', data: 'Sorry for the inconvinence, please login again'})
    })
    
}