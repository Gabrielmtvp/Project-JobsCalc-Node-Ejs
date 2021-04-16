const Profile = require("../models/Profile")

module.exports = {
    async index(req, res){
        return res.render("profile", { profile: await Profile.get() })
    },

    async update(req, res){
        //req.body para pegar os dados
        const data = req.body;
        //definir quantas semanas tem um ano
        const weeksPerYear = 52;
        //remover as semanas de férias do ano
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
        //quantas horas por semana estou trabalhando
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
        //total de horas trabalhadas no mês
        const monthlyTotalHours = weekTotalHours * weeksPerMonth;
        //Qual será o valor da minha hora ? 
        data["hour-value"] = data["monthly-budget"] / monthlyTotalHours;

        await Profile.update(data);

        return res.redirect('/profile');
    }
}