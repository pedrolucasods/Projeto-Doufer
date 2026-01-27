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
                
            })
        } catch (error) {
            return res.status(500).send(`Erro ao trazer ao exibir os pedidos: ${error}`)
        }
    }

    // formulario cadastrar pedido
    async formCadastrarPedido(req,res){
        try {
            const clientes = await ClienteService.listarTodos()
            return res.render('addpedido',{
                stylesheet:'styleaddpedido.css', 
                script:'addpedido.js', 
                layout:'main.handlebars', 
                clientes})

        } catch (error) {
            return res.status(500).send(`Erro ao criar um novo pedido: ${error}`)
        }
    }

    // cadastrar pedido
    async cadastrarPedido(req,res){
        try {
            if (req.body.pedido) {
                let pedido = await PedidoService.cadastrar(req.body.pedido)
                return res.send(pedido)
            }
        } catch (error) {
            return res.status(400).send(`Erro ao cadastrar pedido: ${error}`)
        }
    }

    //formulario editar pedido
    async formEditarPedido(req,res){
        try {
            const {arraydeItens,Pedidoid,pedido_status,pedido_id_cliente,pedido_data,nome} = await PedidoService.formEditar(req.params.id)
            //Info Itens Pedido
            return res.render('editarPedido', {
                    script:'editarpedido.js',
                    Pedidoid,
                    pedido_status,
                    pedido_id_cliente,
                    pedido_data,
                    nome, 
                    ItensPedido:JSON.stringify(arraydeItens)})

        } catch (error) {
            return res.status(500).send(`Erro ao editar pedido: ${error}`)
        }
    }

    // editar pedido
    async editarPedido(req,res){
        try {
            if (req.body.pedido) {
                let pedido = await PedidoService.editarPedido(req.body.pedido,req.params.id)
                return res.send(pedido)
            
            }
        } catch (error) {
            return res.status(500).send(`Erro ao editar pedido: ${error}`)
        }
    }

    async deletarPedido(req,res){
        try {
            await PedidoService.deletar(req.params.id)
            return res.send(`
                <!DOCTYPE html>
                <html>
                    <h1>
                        Cliente Deletado com sucesso!
                    </h1>
                    <br><br>
                    <a href="/pedidos"><button id="voltar">Voltar ao menu</button></a>
                    
                    <script>
                    </script>    
                </html>
            `)
        } catch (error) {
            return res.status(500).send(`Erro ao deletar pedido: ${error}`)
        }
    }
}

module.exports = new Pedido()