
const User = require('../modules/usermodel');



var JwtStrategy = require("passport-jwt").Strategy ;
var ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = function(passport){
let params = {
jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
secretOrKey : process.env.JWT_SECRET
};
passport.use(new JwtStrategy(params, function(jwt_payload, next) {
    console.log(jwt_payload) ;
    User.findById({_id : jwt_payload.id}, function(err, user) {
        if (err) {
            return next(err, false);
        }
        if (user) {
            return next(null, user);
        } else {
            return next(null, false);
            // or you could create a new account
        }
    });
}));
}
