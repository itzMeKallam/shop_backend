const express = require('express')
const {adminPostSignup} = require('../../controller/admin/signup')
const {adminPostSignupMiddleWare} = require('../../middleware/admin/validation/signup')
const router = express.Router();
router.post(
    '/', 
    adminPostSignupMiddleWare,
    adminPostSignup
    )
module.exports = router


