 module.exports = {
    remainingDays(job){
        //Calculo de tempo restante
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
        const dueDay = parseInt(new Date(job.created_at).getDate()) + parseInt(remainingDays);
        const dueDate = new Date(job.created_at).setDate(dueDay);
        const dayDiff = Math.ceil(new Date(dueDate - Date.now()) / (1000*60*60*24));
   
        //Restam x dias
        return dayDiff;
   },
   calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}