const modelCliente = require('../models/cliente')
const ClienteService = require('../services/cliente')
const PedidoService = require('../services/pedido')
const {ValidatorCadastroCliente} = require('../validators/clientes/cadastro_clientes_validator')
const {ValidatorEdicaoCliente} = require('../validators/clientes/editar_cliente_validator')
class Cliente{

    // listar clientes
    async listar(req,res){
        try {
            const clientes = await ClienteService.listar_todos()
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

    // cadastrar cliente
    async cadastrar(req,res){
        try {
            const Dados =  req.body
            const validar_dados = await ValidatorCadastroCliente(Dados,res)
            if(!validar_dados){
                return
            }
            await ClienteService.cadastrar(Dados)
            return res.json({
                "msg":"Cliente cadastrado!"
            }) 
        
        } catch (error) {
            return res.status(500).json({"Erro":`${error.message}`})
        }
    }

    // editar cliente
    async editar(req,res){
        try {
            let Dados = req.body
            Dados.cliente_id = req.params.id
            const validar_dados = await ValidatorEdicaoCliente(Dados,res)
            if(!validar_dados){
                return
            }
            
            await ClienteService.editar(Dados)
            return res.json({
                "msg":"Cliente editado!"
            }) 
        } catch (error) {
            return res.status(500).json({"Erro":`${error.message}`})
        }
    }

    //deletar cliente
    async deletar(req,res){
        try {
            const idcliente = req.params.id
            await ClienteService.deletar(idcliente)
            return res.json({
                "msg":"Cliente deletado!"
            }) 
        } catch (error) {
            return res.status(500).json({"Erro":`${error.message}`})
        }
    }

    
    
// formulario cadastrar cliente
    formulario_cadastrar(req,res){
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

    // formulario editar cliente
    async formulario_editar(req,res){
        try {
            let clienteId = req.params.id
            const cliente = await ClienteService.buscarCliente(clienteId)
            return res.render('editarcliente',
                {
                    stylesheet:'editarcliente.css',
                    script:'editarcliente.js',
                    cliente,
                    error:req.query.error || null,
                    msg: req.query.msg || null
                })
        } catch (error) {
            return res.status(500).send(`Erro ao carregar ao editar cliente: ${error}`)
        }
    }

    // Detalhes Cliente
    async detalhes(req,res){
        try {
            const cliente = await ClienteService.detalhes(req.params.id)
            return res.render('detalhesCliente',{
                stylesheet:'detalhesCliente.css',
                script:'detalhesCliente.js',
                cliente,
                error:req.query.error || null,
                msg: req.query.msg || null
            })

        } catch (error) {
            return res.status(500).send(`Erro ao carregar os dados do cliente: ${error.message}`)
        }
    }


}

module.exports = new Cliente()