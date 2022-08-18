const passport = require('passport')
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;
const User = require("../api/models/user");

passport.use(
  new JwtStrategy(
    {
      secretOrKey: "practicesecret",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function (jwtPayload, done) {
      try {
        const user = await User.findOne({ where: { id: jwtPayload.id } });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
