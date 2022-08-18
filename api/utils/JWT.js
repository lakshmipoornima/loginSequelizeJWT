const jwt = require('jwt-simple');
const {generateJWTToken}=require('../middlewares/auth')


const createJwtToken = generateJWTToken({
    jwt,
    jwtSecret:process.env.JWT_SECRET
  });
  
  
  exports.createJwtToken = createJwtToken;