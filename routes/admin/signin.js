const express = require('express')
const {adminPostSignin} = require('../../controller/admin/signin')
const {adminPostSigninMiddleWare} = require('../../middleware/admin/validation/signin')
const router = express.Router();
router.post(
    '/', 
    adminPostSigninMiddleWare,
    adminPostSignin
    )
module.exports = router


