require("dotenv").config();
const express = require('express');
const cors = require('cors');
const connect=require('../db');

const app = express();
const PORT = process.env.PORT || 5000;
const UserRouter = require('./user/user.route')
const jobRouter = require('./job/jobform');
const movieRouter = require('./movies/movies.routes')

app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:true,credentials:true}));
app.use(express.json()); 

app.use("/user",UserRouter);      
app.use("/user",jobRouter);
app.use("/user",movieRouter)      

app.get("/",(req,res)=>{
  res.send("hello world!");
});




app.listen(PORT, async() => {
  await connect()
  console.log(`Server listening on port : http://localhost:${PORT}`);
});
