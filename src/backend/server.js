// app/server.js

//puxando dependencias
const express = require('express')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const db = require('./database')
const app = express()
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')


// puxando models
const cliente = require('./models/cliente')
const pedido = require('./models/pedidos')
const itenspedidos = require('./models/itensPedidos')
const medidas_cliente = require('./models/medidas_cliente')

// puxando a associação
const association = require('./associations/associations')

//configurando bootstrap


//Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
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
        or: (a, b) => a || b,
        json: (context) => JSON.stringify(context),
        mostrar:(valor) =>{return valor?valor:"-"}
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}))

app.set('view engine', 'handlebars')


app.set('views', path.join(__dirname, '../frontend/views'))

app.use(express.static(path.join(__dirname, '../frontend/public')))
app.use('/bootstrap', express.static(path.join(__dirname, '../../node_modules/bootstrap/dist')));
app.use('/icons', express.static(path.join(__dirname, '../../node_modules/bootstrap-icons/font')));




// Rotas

// home
const homeroute = require('./routes/homeroutes')
app.use('/', homeroute)

// Rotas dos clientes
const clienteroute = require('./routes/clienteroutes')
app.use('/clientes', clienteroute)
// apis cliente
const apicliente = require('./routes/clienteapis')
app.use('/api/clientes', apicliente)

// Rotas dos Pedidos
const pedidoroute = require('./routes/pedidoroutes')
app.use('/pedidos', pedidoroute)
// api pedidos
const apipedido = require('./routes/pedidoapis')
app.use('/api/pedidos', apipedido)

// Exporta tanto o app quanto a função para startar o servidor
function startServer(port = process.env.PORT) {
    db.authenticate().then(function () {
        console.log('Banco de dados Sincronizado')
    }).catch(function (erro) {
        console.log('erro : ' + erro)
    })

    // medidas_cliente.drop()
    // db.sync().then(function(){
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



