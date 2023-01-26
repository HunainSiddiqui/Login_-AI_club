const express = require('express');
const router = express.Router();
const {userlist,useradd, authUser,forget,updatenumber} = require('../controllers/userController') ;
const bodyparser = require("body-parser");
var passport = require('passport');
router.use(bodyparser.urlencoded({extended:false})) ;
require("../config/passport")(passport)

router.route("/chat").get(passport.authenticate('jwt',{session:false}),userlist) ;
router.route("/register").post(useradd) ;
router.post("/login",authUser) ;
router.post("/forget",forget) ;
router.route("/update").post(updatenumber).get(passport.authenticate('jwt',{session:false}),userlist) ;
module.exports = router ;