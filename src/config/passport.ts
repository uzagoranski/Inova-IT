const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const opts: any = {};
require('dotenv').config();

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrKey;

module.exports = (passport: any) => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload: any, done: any) => {
        User.findById(jwt_payload.id)
            .then((user: any) => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch ((err: any) => console.log(err));
        })
    )
}