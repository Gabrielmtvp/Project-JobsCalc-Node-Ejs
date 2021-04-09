const Job = require("../models/Job")
const JobUtils = require("../utils/JobUtils")
const Profile = require("../models/Profile");

module.exports = {
    create(req, res){
        return res.render("job");
    },
    save(req, res){
         //req.body == { name: 'fewf', 'daily-hours': '4', 'total-hours': '5' }
        const jobs = Job.get();

        const job = req.body;
        job.created_at = Date.now();
        job.id = jobs.length + 1;
        
        jobs.push(job);

        return res.redirect('/')
    },
    show(req, res){
        const jobs = Job.get();
        const profile = Profile.get();
        const jobId = req.params.id;

        const job = jobs.find(job => job.id == jobId);
        if(!job){
            return res.send('Job not found!'); 
        }

        job.budget = JobUtils.calculateBudget(job, profile["hour-value"]);
        return res.render("job-edit", {job});
    },
    update(req, res){
        const jobs = Job.get();
        const jobId = req.params.id;
        const job = jobs.find(job => job.id == jobId);
        if(!job){
            return res.send('Job not found!'); 
        }
        const updatedJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        }

        const newJobs = jobs.map(job => {
            if(job.id == jobId){
                job = updatedJob;
            }
            return job;
        });

        Job.update(newJobs);

        res.redirect('/job/' + jobId);
    },
    delete(req, res){
        const jobId = req.params.id;
        Job.delete(jobId);
        return res.redirect('/');
    }
}