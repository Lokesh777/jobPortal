const e = require("express");
const express = require("express");
// const middleware = require("../middleware");
const app = express.Router();
const Job = require("../job/job.model");

app.get("/jobs", async(req, res) => {
  try {
		const post = await Job.find()
		res.send(post)
	} catch {
		res.status(404)
		res.send({ error: "Job doesn't exist!" })
	}
})

// Handle form submission
// app.post("/jobs", async(req, res) => {
//     const {company, position, contract, location ,image } = req.body;
//     const user = await Job.findOne({company}) //user based on company
//     console.log(company);
//     try {
//         if(user){
//             if (!position || !contract || !location || !image) {
//                 return res.send({message: "Missing Details"});
//             }
//              else{
//                  return res.send("Jobs already exists...") //if input is empty
//               }
//           }
//           const jobs = new Job({company, position, location, contract,image});
//           await jobs.save();//save the jobs in database
//          return  res.status(200).send({jobs,message: "Job Posted successfully"})

       
//     } catch (e) {
//         return res.send({msg: e.message});
//     }


// })
app.post("/jobs", async(req, res) => {
    const { company, position, contract, location, image, searchTerm, filter } = req.body;

    try {
        let user;
        if (filter) {
            user = await Job.findOne({ company, location: filter });
        } else if (searchTerm) {
            user = await Job.find({
                $or: [
                    { company: { $regex: searchTerm, $options: "i" } },
                    { position: { $regex: searchTerm, $options: "i" } },
                    { location: { $regex: searchTerm, $options: "i" } }
                ]
            });
        } else {
            user = await Job.findOne({ company });
        }

        if (user) {
            if (!position || !contract || !location || !image) {
                return res.send({ message: "Missing Details" });
            } else {
                return res.send("Jobs already exists...");
            }
        }

        const jobs = new Job({ company, position, location, contract, image });
        await jobs.save();
        return res.status(200).send({ jobs, message: "Job posted successfully" });
    } catch (e) {
        return res.send({ msg: e.message });
    }
});
 

//delete mode 
app.delete("/jobs/:id", async (req, res) => {
	try {
		await Job.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

//patch the request
app.patch("/jobs/:id", async (req, res) => {
	try {
		const post = await Job.findOne({ _id: req.params.id })

		if (req.body.company) {
			post.company = req.body.company;
		}

		if (req.body.position) {
			post.position = req.body.position;
		}
		if (req.body.contract) {
			post.contract = req.body.contract;
		}
		if (req.body.location) {
			post.location = req.body.location;
		}
		if (req.body.image) {
			post.image = req.body.image;
		}

		await post.save()
		res.send(post)

	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

module.exports = app;