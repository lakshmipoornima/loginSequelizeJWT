const {sign} = require('jsonwebtoken')

const createTokens = (user) => {
    const accessToken = sign({ id:user.id,email:user.email },process.env.JWT_SECRET);
    return accessToken;
}

module.exports = { createTokens }