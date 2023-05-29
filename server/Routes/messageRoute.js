const {getallMessages,postMessages} = require('../Controller/messageController')

const router = require('express').Router()
//register function->usercontroller
router.post('/pmsg',postMessages)
router.post('/getallmessages',getallMessages)

module.exports = router;