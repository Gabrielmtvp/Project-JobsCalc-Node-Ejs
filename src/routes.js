//Express - Biblioteca para criar o servidor
const express = require('express');
//Routes - Uma parte do Express que cria as rotas/caminhos
const routes = express.Router();

const views = __dirname + "/views/";

const Profile = {
    data: {
        name: "Gabriel",
        avatar: "https://avatars.githubusercontent.com/u/23700451?s=400&u=edd3e561e54e9d491c2b37b19669fe83850c0279&v=4",
        "monthly-budget": 3000,
        "hours-per-day": 5,
        "days-per-week": 5,
        "vacation-per-year": 4,
        "hour-value": 75
    },

    controller: {
        index(req, res){
            return res.render(views + "profile", { profile: Profile.data })
        },

        update(req, res){
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

            Profile.data = data;
 
            return res.redirect('/profile');
        }
    }
}

const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            "daily-hours": 2,
            "total-hours": 0,
            created_at: Date.now()
        },
        {
            id: 2,
            name: "OneTwo Project",
            "daily-hours": 3,
            "total-hours": 46,
            created_at: Date.now()
        }
    ],

    controllers: {
        index(req, res){
            const updatedJobs = Job.data.map((job) => {
                const days = Job.services.remainingDays(job);
                const status = days <= 0 ? "Done" : "Progress";
        
                return {
                    ...job,
                    remainingDays: days,
                    status: status,
                    budget: Job.services.calculateBudget(job, Profile.data["hour-value"])
                }
            });
            
            return res.render(views + "index", { jobs: updatedJobs })
        },
        create(req, res){
            return res.render(views + "job");
        },
        save(req, res){
             //req.body == { name: 'fewf', 'daily-hours': '4', 'total-hours': '5' }

            const job = req.body;
            job.created_at = Date.now();
            job.id = Job.data.length + 1;
            Job.data.push(job);

            return res.redirect('/')
        },
        show(req, res){
            const jobId = req.params.id;
            const job = Job.data.find(job => job.id == jobId);
            if(!job){
                return res.send('Job not found!'); 
            }
            job.budget = Job.services.calculateBudget(job, Profile.data["hour-value"]);
            return res.render(views + "job-edit", {job});
        },
        update(req, res){
            const jobId = req.params.id;
            const job = Job.data.find(job => job.id == jobId);
            if(!job){
                return res.send('Job not found!'); 
            }
            const updatedJob = {
                ...job,
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"]
            }

            Job.data = Job.data.map(job => {
                if(job.id == jobId){
                    job = updatedJob;
                }
                return job;
            });

            res.redirect('/job/' + jobId);
        },
        delete(req, res){
            const jobId = req.params.id;
            Job.data = Job.data.filter(job => Number(job.id) != Number(jobId))

            return res.redirect('/');
        }
    },

    services: {
        remainingDays(job){
            //Calculo de tempo restante
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
            const dueDay = parseInt(new Date(job.created_at).getDate()) + parseInt(remainingDays);
            const dueDate = new Date(job.created_at).setDate(dueDay);
            const dayDiff = Math.floor(new Date(dueDate - Date.now()) / (1000*60*60*24));
       
            //Restam x dias
            return dayDiff;
       },
       calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
    }
}

routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile',  Profile.controller.index)
routes.post('/profile',  Profile.controller.update)


module.exports = routes;