const express = require("express")
const server = express()
const routes = require("./routes")

//Usando template engine
server.set('view engine', 'ejs')

//Habilita os arquivos static na pasta public
server.use(express.static("public"));

//Usa as routes no servidor
server.use(routes);

//Inicia o servidor
server.listen(3000, () => console.log("Servidor Iniciado!!!"))
