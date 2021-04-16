const Database = require('../db/config')

module.exports = {
    async get(){
        // Inicia conexão
        const db = await Database()
        // Executa Query
        const data = await db.get(`select * from profile`)
        // Fecha conexão com banco de dados
        await db.close()

        return  {
            name: data.name,
            avatar: data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vacation-per-year": data.vacation_per_year,
            "hour-value": data.value_hour
        };
    },
    async update(newData){
        const db = await Database()

        await db.run(`UPDATE profile SET
        name = "${newData.name}",
        avatar = "${newData.avatar}",
        monthly_budget = ${newData["monthly-budget"]},
        days_per_week = ${newData["days-per-week"]},
        hours_per_day = ${newData["hours-per-day"]},
        vacation_per_year = ${newData["vacation-per-year"]},
        value_hour = ${newData["hour-value"]} 
        `)

        await db.close()
    }
}