const {register,login,setAvatar} = require('../Controller/userController')

const router = require('express').Router()
//register function->usercontroller
router.post('/register',register)
router.post('/login',login)
router.post('/setavatar/:id',setAvatar)

module.exports = router;