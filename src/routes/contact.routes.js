const express = require('express');
const { submitContact, getData } = require('../controller/contact.controller');
const { auth } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/form',submitContact);
router.get('/formdata',auth,getData);

module.exports = router;
