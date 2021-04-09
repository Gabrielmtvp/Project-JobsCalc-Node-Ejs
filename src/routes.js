// Express - Biblioteca para criar o servidor
const express = require('express');
// Routes - Uma parte do Express que cria as rotas/caminhos
const routes = express.Router();
// Importar o controller Profile
const ProfileController = require("./controllers/ProfileController")
// Importar o controller Job
const JobController = require("./controllers/JobController");
// Importar o controller Dashboard
const DashboardController = require('./controllers/DashboardController');

routes.get('/', DashboardController.index)
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile',  ProfileController.index)
routes.post('/profile',  ProfileController.update)

module.exports = routes;