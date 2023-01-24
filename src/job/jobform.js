const e = require("express");
const express = require("express");
// const middleware = require("../middleware");
const app = express.Router();
const Job = require("../job/job.model");
const User = require("../user/user.model");

// app.use(middleware)
app.get("/jobs", async(req, res) => {
    const jobs = await Job.find();
    return res.send(jobs)
})

app.post("/jobs", async(req, res) => {
    const {companyName, position, contact, location } = req.body;
    const user = await User.findOne({role: req.userRole }, {password: 0})
    try {
        if(user){
            if (!companyName || !position || !contact || !location) {
                return res.send({message: "Missing Details"});
            }
            const jobs = new Job({companyName, position, location, contact});
            await jobs.save();
            return res.send(200).send({message: "Job Posted successfully"})
        }
        else{
            return res.send("User not Found")
        }
    } catch (e) {
        return res.send({msg: e.message})
    }


})

module.exports = app;