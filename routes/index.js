import express from "express";
import path from "path";
import axios from "axios";
import bodyParser from "body-parser";
import fs from "fs";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// var jobDetails = [

//     {
//         title: "Genpact is hiring 2020-2024 graduates (freshers and experienced)",
//         desc: "Genpact is hiring 2020 to 2024 graduates(Freshers and experienced) for English ( Voice Process )Role :Process Associate, Customer Service - Voice Process EnglishSkillset : Fresher or Max 2yrs expieren  ...",
//         location: "HYDERABAD",

//     }, {
//         title: "Accenture is hiring 2020-2024 graduates (freshers and experienced)",
//         desc: "Accenture is hiring 2020 to 2024 graduates(Freshers and experienced)",
//         location: "Pune",

//     }, {

//         title: "TCS is hiring 2020-2024 graduates (freshers and experienced)",
//         desc: "TCS is hiring for 2024 graduates(Freshers)",
//         location: "Chennai",

//     }

// ];

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static("../public"));

app.set("view engine", "ejs"); //This tells Express that you are using EJS for rendering views.

// Set the views directory
app.set("views", path.join(process.cwd(), "../views")); //This line sets the directory where your EJS templates are located.

// process.cwd() - /home/omkar-zurange/code/Testing/routes

// app.get("/", (req, res) => {

//     res.render("index", { jobs: jobDetails });

// });

// app.get('/images/:CompanyName', (req, res) => {

//   //console.log(__filename); // /home/omkar-zurange/TestServer/webServer/routes/index.js
//   //console.log(__dirname); // /home/omkar-zurange/TestServer/webServer/routes

//   const imageDir = path.join(__dirname, '../public/images');
//   const imageName = req.params.CompanyName + ".png";
//   const defaultImage = 'Logo.png';

//   //console.log(imageName);

//   // Check if the image exists
//   const imagePath = path.join(imageDir, imageName);
//   const imageSrc = fs.existsSync(imagePath) ? imageName : defaultImage;

//   //console.log(path.join(imageDir, imageSrc));

//   res.sendFile(path.join(imageDir, imageSrc));
// });

// app.get("/", async (req, res) => {
//   try {
//     let page = parseInt(req.query.page) || 1;

//     //    console.log(page);

//     const jobDetails = await axios.get(
//       "http://103.211.219.31:3000/all?page=" + page
//     );

//     // console.log(jobDetails.data.uniqueskills);

//     res.render("index.ejs", { jobs: jobDetails });
//   } catch (error) {}
// });

// app.get("/filter", async (req, res) => {
//   try {
//     const jobLocation = req.query.jobLocation || "";
//     let jobExperience = req.query.jobExperience || "";
//     const jobSkills = req.query.jobSkills || "";
//     const pageNo = parseInt(req.query.page) || 1;

//     console.log(
//       `/filter?jobSkills=${jobSkills}&jobExperience=${jobExperience}&jobLocation=${jobLocation}`
//     );

//     const jobDetails = await axios.get(
//       `http://103.211.219.31:3000/filter?jobSkills=${jobSkills}&jobExperience=${jobExperience}&jobLocation=${jobLocation}&page=${pageNo}`
//     );

//     console.log("/" + jobDetails.data.pageNo);

//     res.render("index.ejs", {
//       jobs: jobDetails,
//       jobLocation: jobLocation,
//       jobExperience: jobExperience,
//       jobSkills: jobSkills,
//     });
//   } catch (error) {
//     res.redirect("/");
//   }
// });

// app.get("/all",async (req,res)=> {

//   console.log(req.body);

// });

// app.get("/getJobLocation", async (req, res) => {
//   try {
//     const jobLocation = await axios.get(
//       "http://103.211.219.31:3000/jobLocation"
//     );
//     res.json(jobLocation.data);
//   } catch (error) {}
// });

// app.get("/jobs/:jobId", async (req, res) => {
//   const jobreqId = req.params.jobId;

//   try {
//     const JOB = await axios.get(`http://103.211.219.31:3000/jobs/${jobreqId}`);

//     res.render("jobs.ejs", { JOB: JOB });
//   } catch (error) {}
// });

app.get("/", async (req, res) => {
  try {
    const preData = await axios.get(`http://103.211.219.31:3000/addJob`);

   // console.log(preData.data);

    res.render("app.ejs", { requiredData: preData.data });
  } catch (error) {}
});

app.post("/addNewJob", async (req, res) => {
 
  const jobData = req.body;
  
  console.log(jobData);
  
  req.body.jobId = parseInt(req.body.jobId);
  
  let tempjobExperience= req.body.jobExperience.map(item => parseInt(item, 10));
  
   req.body.jobExperience = tempjobExperience;

  try {
    const response = await axios.post(
      `http://103.211.219.31:3000/addNewJob`,
      jobData
    );
 
    // Handle successful response from API server
    res.send({
      message: "Job data forwarded successfully!",
      apiResponse: response.data,
    });
  } catch (error) {
    console.error("Error forwarding job data:", error);
    // res
    //   .status(500)
    //   .send({ message: "Failed to forward job data", error: error.message });
  }
});

app.listen(port, () => {
  //console.log(process.cwd());
  console.log(`website is online on port ${port}`);
});
