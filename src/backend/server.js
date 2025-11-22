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


//Body Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//config
// Configura Handlebars, public, etc.
app.engine('handlebars', handlebars.engine({
  defaultLayout: 'main', 
  helpers: {  // adicionado helpers para eq e outros
    eq: (a, b) => a == b,
    ne: (a, b) => a != b,
    gt: (a, b) => a > b,
    lt: (a, b) => a < b,
    gte: (a, b) => a >= b,
    lte: (a, b) => a <= b,
    and: (a, b) => a && b,
    or: (a, b) => a || b
  },
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,}}))

app.set('view engine', 'handlebars')


app.set('views', path.join(__dirname,'../frontend/views'))
  
app.use(express.static(path.join(__dirname,'../frontend/public')))




// Rotas

// home
const homeroute = require('./routes/home')
app.use('/',homeroute)

// Rotas dos clientes
const clienteroute = require('./routes/cliente')
app.use('/clientes',clienteroute)

const cadformcliente = require('./routes/addcliente')
app.use('/clientes/newcliente',cadformcliente)

const cadastrocliente = require('./routes/cadcliente')
app.use('/clientes/newcliente/cadcliente',cadastrocliente)

const deletarcliente = require('./routes/deletarcliente')
app.use('/clientes',deletarcliente)

const editarcliente = require('./routes/editarcliente')
app.use('/clientes',editarcliente)

const updatecliente = require('./routes/updatecliente')
app.use('/sucesso',updatecliente)

// Rotas dos Pedidos
const pedidoroute = require('./routes/pedido')
app.use('/pedidos',pedidoroute)

const RouteAddpedido = require('./routes/addpedido')
app.use('/pedidos/newpedido',RouteAddpedido)

const cadastroPedido = require('./routes/cadastroPedidos')
app.use('/pedidos/newPedido/CadastroPedidos', cadastroPedido)

const DeletarPedido = require('./routes/deletarpedido')
app.use('/pedidos', DeletarPedido)

// Exporta tanto o app quanto a função para startar o servidor
function startServer(port = 3000) {

  db.authenticate().then(function(){
    console.log('Banco de dados Sincronizado')
  }).catch(function(erro){
    console.log('erro : '+erro)
  })

  // db.sync({force:true}).then(function(){
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



