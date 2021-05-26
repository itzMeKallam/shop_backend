const express = require('express')
const {adminPostSignup} = require('../../controller/admin/signup')
const {body} = require('express-validator') 
const {adminPostSignupMiddleWare} = require('../../middleware/admin/validation/signup')
const router = express.Router();
router.post(
    '/', 
    adminPostSignupMiddleWare(body),
    adminPostSignup
    )
module.exports = router


