const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")

// Usando template engine
server.set('view engine', 'ejs')

// Mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))

// Habilita os arquivos static na pasta public
server.use(express.static("public"));

// usar o req-body
server.use(express.urlencoded({ extended: true}));

// Usa as routes no servidor
server.use(routes);

// Inicia o servidor
server.listen(3000, () => console.log("Servidor Iniciado!!!"))
