const modelPedido = require('../models/pedidos')
const modelItensPedido = require('../models/itensPedidos')
const modelCliente = require('../models/cliente')
const PedidoService = require('../services/pedido')
const ClienteService = require('../services/cliente')

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
            let clientes = null
            if(!tipoCliente || (tipoCliente != 'pessoa' && tipoCliente != 'empresa')){
                throw new Error('Tipo inválido!')
            }
            if(tipoCliente == 'pessoa'){
                clientes = await ClienteService.listarClientesPessoa()
            }else if(tipoCliente == 'empresa'){
                clientes = await ClienteService.listarClientesEmpresa()
            }
            if(!clientes[0]){
                throw new Error(`Você não possui clientes-${tipoCliente}`)
            }
            return res.render('addpedido',{
                stylesheet:'styleaddpedido.css', 
                script:'addpedido.js', 
                layout:'main.handlebars', 
                clientes,
                tipoCliente,
                error:req.query.error || null,
                msg: req.query.msg || null})

        } catch (error) {
            return res.status(500).json({"Erro":`${error}`})
        }
    }

    // cadastrar pedido
    async cadastrarPedido(req,res){
        try {
            if (!req.body) {
                throw new Error('Não possui dados!')
            }
            const campos = Object.keys(req.body)
            if(campos.length!=4 || (
                !campos.includes('clienteId') ||
                !campos.includes('data') ||
                !campos.includes('itens') ||
                !campos.includes('tipo_cliente'))){
                    throw new Error('Campos inválidos')
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
            const {arraydeItens,Pedidoid,pedido_status,pedido_id_cliente,pedido_data,nome} = await PedidoService.detalhes(req.params.id)
            //Info Itens Pedido
            return res.render('editarPedido', {
                    script:'editarpedido.js',
                    Pedidoid,
                    pedido_status,
                    pedido_id_cliente,
                    pedido_data,
                    nome, 
                    ItensPedido:JSON.stringify(arraydeItens),
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
            return res.status(500).json({"Erro":`${error.message}`})
        }
    }

    async pedidosCliente(req,res){
        try {
            const pedidosFormatados = await PedidoService.pedidosCliente(req.params.id)
            return res.render('pedidos-cliente',{
                script:'pedidos-cliente.js',
                stylesheet:'pedidos-cliente.css',
                pedidos: pedidosFormatados
            })
        } catch (error) {
            return res.status(500).send(`Erro ao listar os pedidos do cliente: ${error}`)
        }
    }

    async detalhesPedido(req,res){
        try {
            const {
                quantidadeItens_com_medida,
                DiasFaltante,
                totalPedido,
                Pedidoid,
                pedido_status,
                pedido_id_cliente,
                pedido_data,
                nome,
                quantidade_Itens_do_Pedido,
                quantidade_total_de_itens,
                arraydeItens} = await PedidoService.detalhes(req.params.id)
            //Info Itens Pedido
            // return res.json({
            //     quantidadeItens_com_medida,
            //     DiasFaltante,
            //     totalPedido,
            //     Pedidoid,
            //     pedido_status,
            //     pedido_id_cliente,
            //     pedido_data,
            //     nome,
            //     quantidade_Itens_do_Pedido,
            //     quantidade_total_de_itens,
            //     arraydeItens
            // })
            
            return res.render('detalhes-pedido', {
                    script:'detalhes-pedido.js',
                    stylesheet:'detalhes-pedido.css',
                    quantidadeItens_com_medida,
                    DiasFaltante,
                    totalPedido,
                    Pedidoid,
                    pedido_status,
                    pedido_id_cliente,
                    pedido_data,
                    nome,
                    quantidade_Itens_do_Pedido,
                    quantidade_total_de_itens,
                    arraydeItens
                }
                )
        } catch (error) {
            return res.status(500).send(`Erro ao exibir os detalhes do pedido!: ${error}`)
        }
    }
}

module.exports = new Pedido()