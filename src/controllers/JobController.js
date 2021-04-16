const Job = require("../models/Job")
const JobUtils = require("../utils/JobUtils")
const Profile = require("../models/Profile");

module.exports = {
    create(req, res){
        return res.render("job");
    },
    async save(req, res){
         //req.body == { name: 'fewf', 'daily-hours': '4', 'total-hours': '5' }
        const jobs = await Job.get();

        const job = req.body;
        job.created_at = Date.now();
        
        await Job.create(job);

        return res.redirect('/')
    },
    async show(req, res){
        const jobs = await Job.get();
        const profile = await Profile.get();
        const jobId = req.params.id;

        const job = jobs.find(job => job.id == jobId);
        if(!job){
            return res.send('Job not found!'); 
        }

        job.budget = JobUtils.calculateBudget(job, profile["hour-value"]);
        return res.render("job-edit", {job});
    },
    async update(req, res){
        const jobId = req.params.id;
        
        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        }

        await Job.update(updatedJob, jobId);

        res.redirect('/job/' + jobId);
    },
    async delete(req, res){
        const jobId = req.params.id;
        await Job.delete(jobId);
        return res.redirect('/');
    }
}