const ServiceItemPedidoMedida = require('../services/item_pedido_medida')
const ServiceMedidaCliente = require('../services/medidas_cliente')
const ServiceCliente = require('../services/cliente')
const {ValidatorCadastroMedidaCliente} = require('../validators/medidas/cadastro_medidas_cliente')
const {ValidadorCadastroMedidaItemPedido} = require('../validators/medidas/cadastro_medidas_item_pedido')
const {ValidatorAtualizarMedidaItemPedido} = require('../validators/medidas/atualizar_medidas_item_pedido')
const {ValidatorAtualizarMedidaCliente} = require('../validators/medidas/atualizar_medida_cliente')
const {ValidatorDeletarMedidaCliente} = require('../validators/medidas/deletar_medida_cliente')
class Medida{
    formulario_cadastro_medidas_cliente_sob_medida(req,res){
        try {
            return res.render('addMedidaSobMedidaCliente',{
                stylesheet:'addMedidaSobMedidaCliente.css',
                script:'addMedidaSobMedidaCliente.js',
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            res.status(500).json({"erro":`${error}`})
        }
    }

    formulario_cadastro_medidas_cliente_padrao(req,res){
        try {
            return res.render('addMedidaPadraoCliente',{
                stylesheet:'addMedidaPadraoCliente.css',
                script:'addMedidaPadraoCliente.js',
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            res.status(500).json({"erro":`${error}`})
        }
    }

    async formulario_atualizar_medidas_cliente_padrao(req,res){
        try {
            const medidas = await ServiceMedidaCliente.buscarMedidaPadraoPorId(req.params.id)
            return res.render('upMedidaPadraoCliente',{
                stylesheet:'upMedidaPadraoCliente.css',
                script:'upMedidaPadraoCliente.js',
                medidas,
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            res.status(500).json({"erro":`${error.message}`})
        }
    }

    async formulario_atualizar_medidas_cliente_sob_medida(req,res){
        try {
            const medidas = await ServiceMedidaCliente.buscarMedidaSobMedidaPorId(req.params.id)
            return res.render('upMedidaSobMedidaCliente',{
                stylesheet:'upMedidaSobMedidaCliente.css',
                script:'upMedidaSobMedidaCliente.js',
                medidas,
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            res.status(500).json({"erro":`${error.message}`})
        }
    }

    async cadastrar_medida_cliente(req,res){
        try {
            const dados = req.body
            const validar_dados = await ValidatorCadastroMedidaCliente(dados,res)
            if(!validar_dados){
                return
            }
            const cadastroMedidas = await ServiceMedidaCliente.cadastrar_medidas(dados)
            if(!cadastroMedidas){
                throw new Error(`Falha ao cadastrar medida!`)
            }
            return res.json({'msg':'Medida Cadastrada com sucesso!'})
        } catch (error) {
            return res.status(500).json({"erro":`${error.message}`})
        }
    }

    async atualizar_medida_cliente(req,res){
        try {
            const dados = req.body
            const validar_dados = await ValidatorAtualizarMedidaCliente(dados,res)
            if(!validar_dados){
                return
            }
            const atualizarMedidas = await ServiceMedidaCliente.atualizar(dados)
            if(!atualizarMedidas){
                throw new Error(`Falha ao cadastrar medida!`)
            }
            return res.json({'msg':'Medida atualizada com sucesso!'})
        } catch (error) {
            return res.status(500).json({"erro":`${error.message}`})
        }
    }

    async deletar_medida_cliente(req,res){
        try {
            const dados = req.body
            const validar_dados = await ValidatorDeletarMedidaCliente(dados,res)
            if(!validar_dados){
                return
            }
            const deletarMedida = await ServiceMedidaCliente.deletar(dados)
            return res.json({'msg':'Medida deletada com sucesso!'})
        } catch (error) {
            return res.status(500).json({"erro":`${error.message}`})
        }
    }

    async listar_medidas(req,res){
        try {
            const clienteId = req.params.id
            const medidas_cliente = await ServiceMedidaCliente.buscar_medidas_cliente(clienteId)
            return res.render("medidas",{
                stylesheet:'medidas.css',
                script:'medidas.js',
                cliente:medidas_cliente,
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            return res.status(500).json({"erro":`${error}`})
        }
    }

    async formulario_cadastro_medidas_padrao_item_pedido(req,res){
        try {
            const item_id = req.params.id
            const dados = await ServiceItemPedidoMedida.dados_formulario_cadastro_medidas_item_pedido(item_id)
            return res.render('addMedidaPadraoItemPedido',{
                stylesheet:'addMedidaPadraoItemPedido.css',
                script:'addMedidaPadraoItemPedido.js',
                ...dados,
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            return res.status(500).json({"erro":`${error.message}`})
        }
    }
    async formulario_cadastro_medidas_sob_medida_item_pedido(req,res){
        try {
            const item_id = req.params.id
            const dados = await ServiceItemPedidoMedida.dados_formulario_cadastro_medidas_item_pedido(item_id)
            return res.render('addMedidaSobMedidaItemPedido',{
                stylesheet:'addMedidaSobMedidaItemPedido.css',
                script:'addMedidaSobMedidaItemPedido.js',
                ...dados,
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            return res.status(500).json({"erro":`${error.message}`})
        }
    }

    async formulario_atualizar_medidas_sob_medida_item_pedido(req,res){
        try {
            const medida_id = req.params.id
            const dados = await ServiceItemPedidoMedida.dados_formulario_atualizar(medida_id)
            return res.render('upMedidaSobMedidaItemPedido',{
                stylesheet:'upMedidaSobMedidaItemPedido.css',
                script:'upMedidaSobMedidaItemPedido.js',
                ...dados,
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            return res.status(500).json({"erro":`${error.message}`})
        }
    }

    async formulario_atualizar_medidas_padrao_item_pedido(req,res){
        try {
            const medida_id = req.params.id
            const dados = await ServiceItemPedidoMedida.dados_formulario_atualizar(medida_id)
            // return res.send(dados)
            return res.render('upMedidaPadraoItemPedido',{
                stylesheet:'upMedidaPadraoItemPedido.css',
                script:'upMedidaPadraoItemPedido.js',
                ...dados,
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            return res.status(500).json({"erro":`${error.message}`})
        }
    }

    async cadastrar_medida_itemPedido(req,res){
        try {
            const dados = req.body
            const validar_dados = await ValidadorCadastroMedidaItemPedido(dados,res)
            if(!validar_dados){
                return
            }
            const cadastro = await ServiceItemPedidoMedida.cadastrar(dados)
            return res.json({"msg":"Cadastro com sucesso!"})
        } catch (error) {
            return res.status(500).json({"erro":`${error.message}`})
        }
    }

    async atualizar_medida_itemPedido(req,res){
        try {
            const dados = req.body
            const validar_dados = await ValidatorAtualizarMedidaItemPedido(dados,res)
            if(!validar_dados){
                return
            }
            const atualizar = await ServiceItemPedidoMedida.atualizar(dados)
            return res.json({"msg":"Medida Atualizada Com Sucesso!"})
        } catch (error) {
            return res.status(500).json({"erro":`${error.message}`})
        }
    }
}

module.exports = new Medida()