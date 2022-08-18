const jwt=require('jwt-simple')

const {makeJWTTokenValidator}=require('./auth')

const authenticate = makeJWTTokenValidator({
    jwt,
    jwtSecret:process.env.JWT_SECRET,
  });
  
  exports.authenticate = authenticate;