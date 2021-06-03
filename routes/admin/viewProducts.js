const express = require('express')
const {adminViewProducts} = require('../../controller/admin/viewProducts')
const isAuth = require('../../middleware/admin/isAuth/')
const router = express.Router();
router.get(
    '/', 
    // isAuth,
    (req, res)=>{
        console.log(req.get('Authorization'))
    }
    )
module.exports = router


