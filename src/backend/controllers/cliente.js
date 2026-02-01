const modelCliente = require('../models/cliente')
const ClienteService = require('../services/cliente')

class Cliente{

    // listar clientes
    async clientes(req,res){
        try {
            const clientes = await ClienteService.listarTodos()
            return res.render('cliente',
                {
                    stylesheet:'stylecliente.css',
                    script:'scriptcliente.js',
                    layout:'main.handlebars',
                    clientes
                })
        } catch (error) {
            return res.status(500).send(`Erro ao listar os clientes: ${error}`)
        }
    }

    // formulario cadastrar cliente
    formCadastrar(req,res){
        try {
            return res.render('addcliente',
                {
                    stylesheet: 'addcliente.css',
                    script:'addcliente.js'
                })
        } catch (error) {
            return res.status(500).send(`Erro ao carregar o formulario de cadastro: ${error}`)
        }
    }

    // cadastrar cliente
    async cadastro(req,res){
        try {
            const nomecliente = req.body.namecliente
            const telefonecliente = req.body.telefonecliente
            const cpf = req.body.cpfcliente
            const nomeempresa = req.body.empresacliente
            console.log(typeof(nomeempresa))

            await ClienteService.cadastrar(nomecliente,telefonecliente,cpf,nomeempresa)

            return res.send(`
            <!DOCTYPE html>
            <html>
                <h1>
                    Cliente Cadastrado com sucesso!
                </h1>
                <br><br>
                <button id="voltar">Voltar ao menu</button>
                
                <script>
                    document.getElementById('voltar').addEventListener('click', function() {
                        window.location.href = '/clientes'})
                </script>   
            </html>

            `)
        } catch (error) {
            return res.status(500).send(`Erro ao cadastrar cliete: ${error}`)
        }
    }
    

    // formulario editar cliente
    async formEditar(req,res){
        try {
            let clienteId = req.params.id
            const cliente = await ClienteService.buscarCliente(clienteId)
            return res.render('editarcliente',
                {
                    stylesheet:'editarcliente.css',
                    script:'editarcliente.js',
                    cliente
                })
        } catch (error) {
            return res.status(500).send(`Erro ao carregar ao editar cliente: ${error}`)
        }
    }


    // editar cliente
    async editar(req,res){
        try {
            let idcliente = req.params.id
            let nomecliente = req.body.namecliente
            let telefonecliente = req.body.telefonecliente
            let cpfcliente = req.body.cpfcliente
            let nomeclienteEmpresa = req.body.empresacliente
            await ClienteService.editar(idcliente,nomecliente,telefonecliente,cpfcliente,nomeclienteEmpresa)
            return res.send(`
                <!DOCTYPE html>
                <html>
                    <h1>
                        Cliente Editado com sucesso!
                    </h1>
                    <br><br>
                    <button id="voltar">Voltar ao menu</button>
                    
                    <script>
                        document.getElementById('voltar').addEventListener('click', function() {
                            window.location.href = '/clientes'})
                    </script>   
                </html>
            `)
        } catch (error) {
            return res.status(500).send(`Erro ao editar cliente: ${error}`)
        }
    }

    //deletar cliente
    async deletar(req,res){
        try {
            const idcliente = req.params.id
            await ClienteService.deletar(idcliente)
            return res.send(`
                <!DOCTYPE html>
                <html>
                    <h1>
                        Cliente Deletado com sucesso!
                    </h1>
                    <br><br>
                    <a href="/clientes"><button id="voltar">Voltar ao menu</button></a>
                    
                    <script>
                    </script>    
                </html>
            `)
        } catch (error) {
            return res.status(500).send(`Erro ao deletar cliente ${error}`)
        }
    }

    // Detalhes Cliente
    async detalhes(req,res){
        try {
            const cliente = await ClienteService.detalhes(req.params.id)
            return res.render('detalhesCliente',{
                stylesheet:'detalhesCliente.css',
                script:'detalhesCliente.js',
                cliente
            })

        } catch (error) {
            return res.status(500).send(`Erro ao carregar os dados do cliente: ${error}`)
        }
    }
}

module.exports = new Cliente()