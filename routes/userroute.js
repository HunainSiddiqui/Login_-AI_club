const express = require('express');
const router = express.Router();
const {userlist,useradd, authUser,forget,updatenumber,listuser,listusername} = require('../controllers/userController') ;
const bodyparser = require("body-parser");
var passport = require('passport');
router.use(bodyparser.urlencoded({extended:false})) ;
require("../config/passport")(passport)

router.route("/chat").get(passport.authenticate('jwt',{session:false}),userlist) ;
router.route("/register").post(useradd) ;
router.post("/login",authUser) ;
router.post("/forget",forget) ;
router.route("/update").post(updatenumber).get(passport.authenticate('jwt',{session:false}),userlist) ;
router.route("/list").get(passport.authenticate('jwt',{session:false}),listuser) ;
router.route("/list").post(listusername) ;
module.exports = router ;