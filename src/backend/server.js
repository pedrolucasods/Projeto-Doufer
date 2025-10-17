// app/server.js

//puxando dependencias
const express = require('express')
const path = require('path')
const db = require('./database')
const app = express()
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')


// puxando models
const cliente = require('./models/cliente')
const pedido = require('./models/pedidos')
const itenspedidos = require('./models/itensPedidos')

// puxando a associação
const association = require('./associations/associations')




//config
  // Configura Handlebars, public, etc.
  app.engine('handlebars', handlebars.engine({defaultLayout: 'main', 
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,}}))

  app.set('view engine', 'handlebars')


  app.set('views', path.join(__dirname,'../frontend/views'))
  
  app.use(express.static(path.join(__dirname,'../frontend/public')))

  //Body Parser
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())


  
// Rotas
const homeroute = require('./routes/home')
app.use('/',homeroute)

const clienteroute = require('./routes/cliente')
app.use('/clientes',clienteroute)

const cadformcliente = require('./routes/addcliente')
app.use('/clientes/newcliente',cadformcliente)

const cadastrocliente = require('./routes/cadcliente')
app.use('/clientes/newcliente/cadcliente',cadastrocliente)

const deletarcliente = require('./routes/deletarcliente')
app.use('/clientes',deletarcliente)


// Exporta tanto o app quanto a função para startar o servidor
function startServer(port = 3000) {

  db.authenticate().then(function(){
    console.log('Banco de dados Sincronizado')
  }).catch(function(erro){
    console.log('erro : '+erro)
  })

  // pedido.sync().then(function(){
  //   console.log('Table adicionada!')     //Criação de tabelas
  // })


  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`Servidor Express rodando em http://localhost:${port}`);
      resolve(server);
    })

    server.on('error', reject)
  })
}

startServer()

module.exports = { startServer }



