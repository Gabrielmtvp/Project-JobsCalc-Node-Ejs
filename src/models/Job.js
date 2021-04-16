const Database = require('../db/config')

module.exports = {
    async get(){
        const db = await Database()

        const jobs = await db.all(`select * from jobs`)

        await db.close()

        return jobs.map(job => ({
                id: job.id,
                name: job.name,
                "daily-hours": job.daily_hours,
                "total-hours": job.total_hours,
                created_at: job.created_at 
        }));
    },

    async update(updatedJob, jobId){
        const db = await Database()

        await db.run(`UPDATE jobs SET
        name = "${updatedJob.name}",
        daily_hours = ${updatedJob["daily-hours"]},
        total_hours = ${updatedJob["total-hours"]}
        where id = ${jobId}
        `)

        await db.close()
    },

    async delete(jobId){
        const db = await Database()

        await db.run(`DELETE FROM jobs where id = ${jobId}`)

        await db.close()
    },

    async create(newJob){
        const db = await Database()

        db.run(`INSERT INTO jobs(name, daily_hours, total_hours, created_at) VALUES("${newJob.name}", ${newJob["daily-hours"]}, ${newJob["total-hours"]}, ${newJob["created_at"]}) `)

        await db.close()
    }
}