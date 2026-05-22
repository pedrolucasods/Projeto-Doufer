const ServiceItemPedidoMedida = require('../services/item_pedido_medida')
const ServiceMedidaCliente = require('../services/medidas_cliente')
const ServiceCliente = require('../services/cliente')
class Medida{
    formulario_cadastro_medidas_cliente_sob_medida(req,res){
        try {
            return res.render('addMedidaSobMedida',{
                stylesheet:'addMedidaSobMedida.css',
                script:'addMedidaSobMedida.js',
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            res.status(500).json({"Erro":`${error}`})
        }
    }

    formulário_cadastro_medidas_cliente_padrao(req,res){
        try {
            return res.render('addMedidaPadraoCliente',{
                stylesheet:'addMedidaPadraoCliente.css',
                script:'addMedidaPadraoCliente.js',
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            res.status(500).json({"Erro":`${error}`})
        }
    }

    async formulário_atualizar_medidas_cliente_padrao(req,res){
        try {
            const medidas = await ServiceMedidaCliente.buscarMedidaPadraoPorId(req.params.id)
            if(!medidas){
                throw new Error('Medida não encontrada')
            }
            return res.render('upMedidaPadraoCliente',{
                stylesheet:'upMedidaPadraoCliente.css',
                script:'upMedidaPadraoCliente.js',
                medidas,
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            res.status(500).json({"Erro":`${error}`})
        }
    }

    async formulário_atualizar_medidas_cliente_sob_medida(req,res){
        try {
            const medidas = await ServiceMedidaCliente.buscarMedidaSobMedidaPorId(req.params.id)
            if(!medidas){
                throw new Error('Medida não encontrada')
            }
            return res.render('upMedidaSobMedidaCliente',{
                stylesheet:'upMedidaSobMedidaCliente.css',
                script:'upMedidaSobMedidaCliente.js',
                medidas,
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            res.status(500).json({"Erro":`${error}`})
        }
    }

    async cadastrar_medida_cliente(req,res){
        try {
            const dados = req.body
            const totalDeCampos = Object.keys(dados).length
            const campos = Object.keys(dados)
            if(totalDeCampos!=2){
                throw new Error('Erro ao cadastrar medida do cliente!')
            }
            if(!campos.includes('tipo_medida') || !campos.includes('medidas')){
                throw new Error('Erro ao cadastrar medida do cliente!')
            }
            ///////////////////////////////////////////////////////////////////
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
            const totalDeCampos = Object.keys(dados).length
            const campos = Object.keys(dados)
            if(totalDeCampos!=2){
                throw new Error('Erro ao cadastrar medida do cliente!')
            }
            if(!campos.includes('tipo_medida') || !campos.includes('medidas')){
                throw new Error('Erro ao cadastrar medida do cliente!')
            }
            ///////////////////////////////////////////////////////////////////
            const atualizarMedidas = await ServiceMedidaCliente.atualizar(dados)
            if(!atualizarMedidas){
                throw new Error(`Falha ao cadastrar medida!`)
            }
            return res.json({'msg':'Medida atualizada com sucesso!'})
        } catch (error) {
            return res.status(500).json({"erro":`${error.message}`})
        }
    }



    async listar_medidas(req,res){
        try {
            const clienteId = req.params.id
            const MedidaSobMedida = await ServiceMedidaCliente.buscarMedidaSobMedidaPorCliente(clienteId)
            const MedidaPadrao = await ServiceMedidaCliente.buscarMedidaPadraoPorCliente(clienteId)
            const Cliente = await ServiceCliente.buscarCliente(clienteId)
            return res.render("medidas",{
                stylesheet:'medidas.css',
                script:'medidas.js',
                medidas:MedidaSobMedida,
                medidaspadrao:MedidaPadrao,
                Cliente,
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            return res.status(500).json({"Erro":`${error}`})
        }
    }

    async cadastrar_medida_itemPedido(req,res){
        try {
            const dados = req.body
            const campos = Object.keys(dados)
            const totalCampos = campos.length
            if(totalCampos>4 || totalCampos<4){
                throw new Error("Erro ao cadastrar medida, campos inválidos!")
            }
            if(
                !campos.includes("item_pedido_id")||
                !campos.includes("tipo_medida")||
                !campos.includes("quantidade")
            ){
                throw new Error("Erro ao cadastrar medida, campos inválidos!")
            }
            const cadastro = await ServiceItemPedidoMedida.cadastrar(dados)
            return res.json({"msg":"Cadastro com sucesso!"})
        } catch (error) {
            return res.status(500).json({"Erro":`${error.message}`})
        }
    }
}

module.exports = new Medida()