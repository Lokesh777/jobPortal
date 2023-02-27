const express=require("express")
const User=require("./user.model")
const jwt=require("jsonwebtoken")
const app=express.Router()
const secret= process.env.SECRET_PASSWORD;


app.post("/register",async(req,res)=>{
    const {name,email,password}=req.body
    const user=await User.findOne({ email });

    if (user) {
        return res.send({ message: "user already exists,please login" });
      }
    // if (null === user) {
    //     return res.send({ message: "Please enter the Signup credential!!!" });
    //   }

      await User.create({
        name,email,password
      })

      return res.status(201).send({
        message: "user created successfully",
        name,
        email,
        password,
      });
})

app.post("/login",async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      if (user.password !== password) {
        return res.status(403).send({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          id: user._id,
          name:user.name,
          email:user.email
        },
        secret,
    { expiresIn: "7 days" }
      );
    
      return res.send({status:true, message: "login successful", token });
})

app.get("/",async(req,res)=>{
    let user=await User.find()
    return res.send(user)
})

module.exports =app