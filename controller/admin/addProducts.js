const AdminProducts = require('../../model/admin/addProducts')

exports.adminAddProducts =(req,res, next)=>{
    
    const adminProducts =new AdminProducts({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: './images/book.jpg',
        createdBy: req.userId
    })
    return adminProducts.save().then(product=>{
        return res.status(201).json({message: 'Product', data: 'Product added'})
    })
} 