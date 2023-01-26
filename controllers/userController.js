const User = require("../modules/usermodel")
const generateToken = require("../config/generatetoken")
const asyncHandler = require("express-async-handler");
const userlist =  async (req,res) => {
   console.log(req.user) ;
    
    res.send(req.user) ;
    
}
const useradd = asyncHandler(async (req, res) => {
    const { name, email, password ,phone} = req.body;
    console.log(req.body);
    if (!name || !email || !password || !phone) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
  
    const user = await User.create({
      name,
      email,
      password,
      phone,
      
      
    });

    if (user) {
        res.status(201).json({
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("User not found");
      }
    })
    const authUser = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
      
        const user = await User.findOne({ email });
      
        if (user && (await user.matchPassword(password))) {
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
          });
        } else {
          res.status(401);
          throw new Error("Invalid Email or Password");
        }
      });
    const forget = asyncHandler(async (req, res) => { 
        const {email} = req.body ;
        console.log(email) ;
        if(email)
        {
        res.json({
          message : "ok"
        })
      }
      else {
        res.status(401);
        throw new Error("Invalid Email or Password");
      }

      });
    

      const updatenumber = asyncHandler(async (req, res) => 
      {
        const { id,phone } = req.body;
       
    
        
       const  data = await User.findOne({_id:id})
       if(data)
       {
      
         const userdata = await User.findByIdAndUpdate({_id:id},{$set:{phone : phone}});
         res.status(200).send({success:true,msg:"Done"}) ;
       }
       else{
        res.status(200).send({success:true,msg:" not Done"}) ;
       }
       

      })
      const listuser = asyncHandler(async (req, res) => { 
        const usedata = await User.find() ;
        
        res.json(usedata) ;
      })
      const listusername = asyncHandler(async (req, res) => { 
      const {name} = req.body ;
      
      const namedata = await User.find({name:name}) ;
      res.json(namedata) ;
      })



module.exports = {userlist,useradd,authUser,forget,updatenumber,listuser,listusername} ;