const modelCliente = require('../models/cliente')
const ClienteService = require('../services/cliente')
const PedidoService = require('../services/pedido')
const MedidasService = require('../services/medidas_cliente')
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
                    clientes,
                    error:req.query.error || null,
                    msg: req.query.msg || null
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
                    script:'addcliente.js',
                    error:req.query.error || null,
                    msg: req.query.msg || null
                })
        } catch (error) {
            return res.status(500).send(`Erro ao carregar o formulario de cadastro: ${error}`)
        }
    }

    // cadastrar cliente
    async cadastro(req,res){
        try {
            const Dados =  req.body
            console.log(Dados)
            if(Dados.cpf){
                let cpfregister = await ClienteService.buscarCliente(Dados.cpf)
                if(cpfregister){
                    return res.status(500).json({'erro':'Cpf ja cadastrado!'})
                }
            }
            if(Dados.tipo_cliente === 'empresa' && Dados.nome_empresa === ''){
                return res.status(400).json({'erro':'Informe o nome da empresa!'})
            }
            if(Dados.tipo_cliente === 'pessoa' && Dados.nome === ''){
                return res.status(400).json({'erro':'Informe seu nome!'})
            }
            await ClienteService.cadastrar(Dados.nome,Dados.telefone,Dados.cpf,Dados.nome_empresa,Dados.tipo_cliente)
            return res.json({
                "msg":"Cliente cadastrado!"
            }) 
        
        } catch (error) {
            return res.status(500).json({"Erro":`${error}`})
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
            const Pedidos = await PedidoService.pedidosCliente(req.params.id)
            const MedidasCliente = await MedidasService.listar(req.params.id)
            const qtdPedidos = Pedidos.length
            return res.render('detalhesCliente',{
                stylesheet:'detalhesCliente.css',
                script:'detalhesCliente.js',
                cliente,
                qtdPedidos,
                MedidasCliente
            })

        } catch (error) {
            return res.status(500).send(`Erro ao carregar os dados do cliente: ${error}`)
        }
    }

    // Cadastrar  medidas cliente
    async cadastrarMedidas(req,res){
        try {
            const clienteid = req.params.id
            const medidas = req.body
            await MedidasService.cadastrar(medidas,clienteid)
            return res.send('Cadastro com sucesso!!')
        } catch (error) {
            return res.status(500).send(`Erro ao cadastrar as medidas: ${error}`)
        }
    }

    // Formulário cadastrar medidas
    formCadastrar_Medidas(req,res){
        try {
            const clienteId = req.params.id
            return res.render('addMedida',{
                stylesheet:'addMedida.css',
                script:'addMedida.js',
                clienteId
            })
        } catch (error) {
            res.status(400).send(`Erro ao acessar essa rota: ${error}`)
        }
    }
    async listarMedidas(req,res){
        try {
            const MedidasCliente = await MedidasService.listar(req.params.id)
            const Cliente = await ClienteService.buscarCliente(req.params.id)
            //return res.send(MedidasCliente)
            return res.render("medidas",{
                stylesheet:'medidas.css',
                script:'medidas.js',
                medidas:MedidasCliente,
                Cliente,
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            return res.status(500).send(`Erro ao listar as medidas: ${error}`)
        }
    }

    // Fomulário editar medidas
    async formEditar_medidas(req,res){
        try {
            const MedidasCliente = await MedidasService.listar(req.params.id)
            return res.render('formEditarMedidas',{
                stylesheet:'formEditarMedidas.css',
                script:'formEditarMedidas.js',
                MedidasCliente
            })
        } catch (error) {
            res.status(404).send(`Erro, pagina não encontrada: ${error}`)
        }
    }

    async editarMedidas(req,res){
        try {
            let medidas = req.body
            let EdicaoMedidas = await MedidasService.editar(medidas,req.params.id)
            return res.redirect(303,`/clientes/detalhes/${req.params.id}`)
        } catch (error) {
            return res.status(500).send(`Erro ao editar as medidas: ${error}`)
        }
    }

    async limparMedidas(req,res){
        try {
            await MedidasService.limpar(req.params.id)
            return res.json({"msg":"Medida limpada com sucesso!"})
        } catch (error) {
            return res.status(500).json({"Erro":`${error}`})
        }
    }
}

module.exports = new Cliente()