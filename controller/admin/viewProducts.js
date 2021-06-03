const AdminProducts = require('../../model/admin/addProducts')

exports.adminViewProducts =(req,res, next)=>{
    console.log('get ready to view products')
    res.status(200).json('get ready to view products')
} 