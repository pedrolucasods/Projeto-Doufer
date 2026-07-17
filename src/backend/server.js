// app/server.js

//puxando dependencias
const express = require('express')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const db = require('./database')
const app = express()
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')


// puxando a associação
const association = require('./associations/associations')

//configurando bootstrap


//Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//config
// Configura Handlebars, public, etc.
const customHelpers = require('./helpers/helpersHandlebars')
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    helpers: customHelpers,
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
const routes = require('./routes/routes')
app.use(routes)

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



