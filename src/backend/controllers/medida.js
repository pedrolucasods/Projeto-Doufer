
const ServiceItemPedidoMedida = require('../services/medidas/item_pedido_medida')
const ServiceMedidaCliente = require('../services/medidas/medidas_clientes')
const ServiceCliente = require('../services/cliente')
const {ValidatorCadastroMedidaCliente} = require('../validators/medidas/cadastro_medidas_cliente')
const {ValidadorCadastroMedidaItemPedido} = require('../validators/medidas/cadastro_medidas_item_pedido')
const {ValidatorAtualizarMedidaItemPedido} = require('../validators/medidas/atualizar_medidas_item_pedido')
const {ValidatorAtualizarMedidaCliente} = require('../validators/medidas/atualizar_medida_cliente')
const {ValidatorDeletarMedidaCliente} = require('../validators/medidas/deletar_medida_cliente')
class Medida{
    formulario_cadastro_medidas_cliente_sob_medida_feminina(req,res){
        try {
            return res.render('./medidas/cliente/sob_medida_feminina/form_cadastro_sob_medida_feminina',{
                stylesheet:'./medidas/cliente/sob_medida_feminina/form_cadastro_sob_medida_feminina.css',
                script:'./medidas/cliente/sob_medida_feminina/form_cadastro_sob_medida_feminina.js',
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            res.status(500).json({"erro":`${error}`})
        }
    }

    formulario_cadastro_medidas_cliente_sob_medida_masculina(req,res){
        try {
            return res.render('./medidas/cliente/sob_medida_masculina/form_cadastro_sob_medida_masculina',{
                stylesheet:'./medidas/cliente/sob_medida_masculina/form_cadastro_sob_medida_masculina.css',
                script:'./medidas/cliente/sob_medida_masculina/form_cadastro_sob_medida_masculina.js',
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            res.status(500).json({"erro":`${error}`})
        }
    }

    formulario_cadastro_medidas_cliente_padrao(req,res){
        try {
            return res.render('./medidas/cliente/padrao/form_cadastro_padrao',{
                stylesheet:'./medidas/cliente/padrao/form_cadastro_padrao.css',
                script:'./medidas/cliente/padrao/form_cadastro_padrao.js',
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            res.status(500).json({"erro":`${error}`})
        }
    }

    async formulario_atualizar_medidas_cliente_padrao(req,res){
        try {
            const dados = {tipo_medida:"padrao",medida_id:req.params.id}
            const medidas = await ServiceMedidaCliente.buscarMedidaPorId(dados)
            return res.render('./medidas/cliente/padrao/form_atualizar_padrao',{
                stylesheet:'./medidas/cliente/padrao/form_atualizar_padrao.css',
                script:'./medidas/cliente/padrao/form_atualizar_padrao.js',
                medidas,
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            res.status(500).json({"erro":`${error.message}`})
        }
    }

    async formulario_atualizar_medidas_cliente_sob_medida_feminina(req,res){
        try {
            const dados = {tipo_medida:"sob_medida",medidas:[{sexo:"feminino"}],medida_id:req.params.id}
            const medidas = await ServiceMedidaCliente.buscarMedidaPorId(dados)
            return res.render('./medidas/cliente/sob_medida_feminina/form_atualizar_sob_medida_feminina',{
                stylesheet:'./medidas/cliente/sob_medida_feminina/form_atualizar_sob_medida_feminina.css',
                script:'./medidas/cliente/sob_medida_feminina/form_atualizar_sob_medida_feminina.js',
                medidas,
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            res.status(500).json({"erro":`${error.message}`})
        }
    }

    async formulario_atualizar_medidas_cliente_sob_medida_masculina(req,res){
        try {
            const dados = {tipo_medida:"sob_medida",medidas:[{sexo:"masculino"}],medida_id:req.params.id}
            const medidas = await ServiceMedidaCliente.buscarMedidaPorId(dados)
            return res.render('./medidas/cliente/sob_medida_masculina/form_atualizar_sob_medida_masculina',{
                stylesheet:'./medidas/cliente/sob_medida_masculina/form_atualizar_sob_medida_masculina.css',
                script:'./medidas/cliente/sob_medida_masculina/form_atualizar_sob_medida_masculina.js',
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
            return res.render("./medidas/cliente/medidas",{
                stylesheet:'./medidas/cliente/medidas.css',
                script:'./medidas/cliente/medidas.js',
                ...medidas_cliente,
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            return res.status(500).json({"erro":`${error}`})
        }
    }

    async listar_medidas_item_pedido_padrao(req,res){
        try {
            const dados = {tipo_medida:"padrao",item_id:req.params.id}
            const medidas = await ServiceItemPedidoMedida.listar_medidas_item_pedido(dados)
            return res.render('./medidas/item_pedido/padrao/listar_padrao',{
                stylesheet:'./medidas/item_pedido/padrao/listar_padrao.css',
                script:'./medidas/item_pedido/padrao/listar_padrao.js',
                ...medidas,
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            return res.status(500).json({"erro":`${error}`})
        }
    }

    async listar_medidas_item_pedido_sob_medida_feminina(req,res){
        try {
            const dados = {tipo_medida:"sob_medida",medidas:[{sexo:"feminino"}],item_id:req.params.id}
            const medidas = await ServiceItemPedidoMedida.listar_medidas_item_pedido(dados)
            return res.render('./medidas/item_pedido/sob_medida_feminina/listar_sob_medida_feminina',{
                stylesheet:'./medidas/item_pedido/sob_medida_feminina/listar_sob_medida_feminina.css',
                script:'./medidas/item_pedido/sob_medida_feminina/listar_sob_medida_feminina.js',
                ...medidas,
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            return res.status(500).json({"erro":`${error}`})
        }
    }

    async listar_medidas_item_pedido_sob_medida_masculina(req,res){
        try {
            const dados = {tipo_medida:"sob_medida",medidas:[{sexo:"masculino"}],item_id:req.params.id}
            const medidas = await ServiceItemPedidoMedida.listar_medidas_item_pedido(dados)
            // return res.send(medidas)
            return res.render('./medidas/item_pedido/sob_medida_masculina/listar_sob_medida_masculina',{
                stylesheet:'./medidas/item_pedido/sob_medida_masculina/listar_sob_medida_masculina.css',
                script:'./medidas/item_pedido/sob_medida_masculina/listar_sob_medida_masculina.js',
                ...medidas,
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
            return res.render('./medidas/item_pedido/padrao/form_cadastro_padrao',{
                stylesheet:'./medidas/item_pedido/padrao/form_cadastro_padrao.css',
                script:'./medidas/item_pedido/padrao/form_cadastro_padrao.js',
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
            return res.send(dados)
            return res.render('./medidas/item_pedido/padrao/form_atualizar_padrao',{
                stylesheet:'./medidas/item_pedido/padrao/form_atualizar_padrao.css',
                script:'./medidas/item_pedido/padrao/form_atualizar_padrao.js',
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