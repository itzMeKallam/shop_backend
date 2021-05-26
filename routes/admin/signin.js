const express = require('express')
const {adminPostSignin} = require('../../controller/admin/signin')
const {body} = require('express-validator') 
const {adminPostSigninMiddleWare} = require('../../middleware/admin/validation/signin')
const router = express.Router();
router.post(
    '/', 
    adminPostSigninMiddleWare(body),
    adminPostSignin
    )
module.exports = router


