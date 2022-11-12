const { register, login } = require('../controllers/authControllers');

const router = require('express').Router();

router.post('/api/auth/login', login);
router.post('/api/auth/register', register);

module.exports = router;
