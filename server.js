const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config() ;
const passport = require('passport');

const app = express() ;
const userroute = require('./routes/userroute');
const connectDB = require('./config/db');

connectDB();
app.use(express.json()) ;

app.use(passport.initialize()) ;



app.use(userroute) ;





const PORT = process.env.PORT || 4000 ;

app.listen(PORT,console.log("server started")) ;








