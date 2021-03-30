//Express - Biblioteca para criar o servidor
const express = require('express');
//Routes - Uma parte do Express que cria as rotas/caminhos
const routes = express.Router();

const views = __dirname + "/views/";

const profile = {
    name: "Gabriel",
    avatar: "https://avatars.githubusercontent.com/u/23700451?s=400&u=edd3e561e54e9d491c2b37b19669fe83850c0279&v=4",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4 
}

routes.get('/', (req, res) => res.render(views + "index"))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile }))


module.exports = routes;