const {register,login,setAvatar,getUsers} = require('../Controller/userController')

const router = require('express').Router()
//register function->usercontroller
router.post('/register',register)
router.post('/login',login)
router.post('/setavatar/:id',setAvatar)
router.get('/getusers/:id',getUsers)

module.exports = router;