const express = require('express')
const {adminAddProducts} = require('../../controller/admin/addProducts')
const isAuth = require('../../middleware/admin/isAuth/')
const router = express.Router();
router.post(
    '/', 
    isAuth,
    adminAddProducts
    )
module.exports = router


