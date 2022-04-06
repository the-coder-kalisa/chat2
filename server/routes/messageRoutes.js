const { sendMsg, getMessages } = require('../controllers/messages.js');

const router = require('express').Router();
router.post('/sendMsg', sendMsg);
router.post('/getMessages', getMessages);
module.exports = router;
