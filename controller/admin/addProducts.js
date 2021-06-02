const { validationResult } = require('express-validator'); 

exports.adminAddProducts =(req,res, next)=>{
    const errors = validationResult(req);
    
    let error
    if (!errors.isEmpty()) {
        error = new Error('validation failed')
        error.statusCode = 422
        error.data = errors.array()
        throw error  
    }
    console.log(req.body)
    console.log(req.userId)
    res.status(201).json(req.body)
} 