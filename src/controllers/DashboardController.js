const Job = require("../models/Job")
const JobUtils = require("../utils/JobUtils")
const Profile = require("../models/Profile");

module.exports = {
    async index(req, res){
        const jobs = await Job.get();
        const profile = await Profile.get();
        let statusCount = {
            Progress: 0,
            Done: 0,
            total: jobs.length
        }

        // total de horas por dia de cada Job em progresso
        let jobTotalHours = 0;

        const updatedJobs = jobs.map((job) => {
            const days = JobUtils.remainingDays(job);
            const status = days <= 0 ? "Done" : "Progress";
    
            // Somando a quantidade de cada status no objeto statusCount
            statusCount[status] += 1;

            jobTotalHours += status == "Progress" ? Number(job["daily-hours"]) : 0;

            return {
                ...job,
                remainingDays: days,
                status: status,
                budget: JobUtils.calculateBudget(job, profile["hour-value"])
            }
        });
        
        // qtd de horas que quero trabalhar
        // MENOS 
        // quantidade de horas/dia de cada job em progress
        const freeHours = Number(profile["hours-per-day"]) - jobTotalHours;

        return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
    }
}
