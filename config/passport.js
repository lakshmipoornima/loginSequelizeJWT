const passport = require('passport')
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;
const User = require("../api/models/user");


const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};


const jwt = async (jwtPayload, done) => {
  try {
    const user = await User.findOne({ where: { id: jwtPayload.id } });
    return done(null, user);
  } 
  catch (err) {
    return done(err);
  }

};

passport.use(new JwtStrategy(jwtOptions,jwt ));
