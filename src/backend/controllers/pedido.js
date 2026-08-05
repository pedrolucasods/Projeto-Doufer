const modelPedido = require('../models/pedidos')
const modelItensPedido = require('../models/itensPedidos')
const modelCliente = require('../models/cliente')
const PedidoService = require('../services/pedido')
const ClienteService = require('../services/cliente')
const {ValidatorTipoClienteForms} = require('../validators/pedidos/form_cadastro_tipo_cliente')
const {ValidatorCadastroPedido} = require('../validators/pedidos/cadastro_pedido')

class Pedido{
    // listar Pedidos
    async pedidos(req,res){
        try {
            // Carrega pedidos mais recentes primeiro
            const pedidosFormatados = await PedidoService.listarTodos()
            return res.render('pedido', {
                stylesheet: 'stylepedido.css',
                script: 'scriptpedido.js',
                layout: 'main.handlebars',
                pedidos: pedidosFormatados,
                error:req.query.error || null,
                msg: req.query.msg || null
                
            })
        } catch (error) {
            return res.status(500).send(`Erro ao trazer ao exibir os pedidos: ${error}`)
        }
    }

    // formulario cadastrar pedido
    async formCadastrarPedido(req,res){
        try {
            let tipoCliente = req.query.tipo
            const validar_dados = await ValidatorTipoClienteForms(tipoCliente,res)
            if(!validar_dados){
                return
            }
            let clientes = await ClienteService.listarClientesPorTipo(tipoCliente)
            return res.render('addpedido',{
                stylesheet:'styleaddpedido.css', 
                script:'addpedido.js', 
                layout:'main.handlebars', 
                clientes,
                tipoCliente,
                error:req.query.error || null,
                msg: req.query.msg || null})

        } catch (error) {
            return res.status(500).json({"erro":`${error}`})
        }
    }

    // cadastrar pedido
    async cadastrarPedido(req,res){
        try {
            const validar_dados = await ValidatorCadastroPedido(req.body,res)
            if(!validar_dados){
                return
            }
            let pedido = await PedidoService.cadastrar(req.body)
                return res.json({
                "msg":"Pedido Adicionado!"
            }) 
        } catch (error) {
            return res.status(500).json({"erro":`${error.message}`})
        }
    }

    //formulario editar pedido
    async formEditarPedido(req,res){
        try {
            const dados = await PedidoService.editar_pedido_dados(req.params.id)
            return res.render('editarPedido', {
                    stylesheet:'editarPedido.css',
                    script:'editarpedido.js',
                    Pedidoid:dados.pedido_id,
                    pedido_status:dados.pedido_status,
                    pedido_id_cliente:dados.cliente_id,
                    pedido_data:dados.pedido_data,
                    nome:dados.nome_cliente,
                    nome_empresa:dados.nome_empresa,
                    ItensPedido:JSON.stringify(dados.itens),
                    error:req.query.error || null,
                    msg: req.query.msg || null
                })

        } catch (error) {
            return res.status(500).send(`Erro ao editar pedido: ${error}`)
        }
    }

    // editar pedido
    async editarPedido(req,res){
        try {
            if (req.body) {
                let pedido = await PedidoService.editarPedido(req.body,req.params.id)
                return res.json({
                    'msg':'Pedido editado!'
                })
            }
        } catch (error) {
            return res.status(500).json({'Erro':`${error}`})
        }
    }

    async deletarPedido(req,res){
        try {
            const PedidoId = req.params.id
            await PedidoService.deletar(PedidoId)
            return res.json({
                "msg":"Pedido Deletado!"
            }) 
        } catch (error) {
            console.log(error)
            return res.status(500).json({"erro":`${error.message}`})
        }
    }

    async pedidosCliente(req,res){
        try {
            const pedidos = await PedidoService.pedidosCliente(req.params.id)
            return res.render('pedidos-cliente',{
                script:'pedidos-cliente.js',
                stylesheet:'pedidos-cliente.css',
                dados: pedidos
            })
        } catch (error) {
            return res.status(500).send(`Erro ao listar os pedidos do cliente: ${error}`)
        }
    }

    async detalhesPedido(req,res){
        try {
            const dados = await PedidoService.detalhes(req.params.id)
            
            return res.render('detalhes-pedido', {
                    script:'detalhes-pedido.js',
                    stylesheet:'detalhes-pedido.css',
                    dados
                })
        } catch (error) {
            return res.status(500).send(`Erro ao exibir os detalhes do pedido!: ${error}`)
        }
    }
}

module.exports = new Pedido()