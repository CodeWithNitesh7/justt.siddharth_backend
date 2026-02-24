const jwt = require('jsonwebtoken');
require('dotenv').config();

function token(payload) {
    const createdToken = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return createdToken;
}

module.exports = token;