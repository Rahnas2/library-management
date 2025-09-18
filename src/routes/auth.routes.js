const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const { validateBody } = require('../middlewares/validate.middleware');
const { registerSchema, loginSchema } = require('../validators/auth.validators');


router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);


module.exports = router;