const { signup, login, users } = require('../controllers/users');

const router = require('express').Router();
router.post('/signup', signup);
router.post('/login', login);
router.get('/users/:id', users);
module.exports = router;