const ServiceMedidaPadrao = require('../services/medidaspadrao')
const ServiceMedidaSobMedida = require('../services/medidassobmedida')
const ServiceItemPedidoMedida = require('../services/item_pedido_medida')

class Medida{
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
            const infoMedidas = dados.medidas[0]
            const camposMedidas = Object.keys(infoMedidas)
            console.log(camposMedidas)
            if(dados.tipo_medida == 'padrao'){
                if(
                    !camposMedidas.includes('cliente_id')||
                    !camposMedidas.includes('tamanho')||
                    !camposMedidas.includes('ajuste')
                ){
                    throw new Error("Erro ao cadastrar medida!")
                }
                if(camposMedidas.length !=3){
                    throw new Error("Erro ao cadastrar medida!")
                }
                const cadMedidaPadrao = await ServiceMedidaPadrao.cadastrar(infoMedidas)
                return res.send(cadMedidaPadrao)
            }else if(dados.tipo_medida == 'sob_medida'){
                if(camposMedidas.length!=9){
                    throw new Error('Erro ao cadastrar medida')
                }
                if(
                    !camposMedidas.includes('cliente_id')||
                    !camposMedidas.includes('busto')||
                    !camposMedidas.includes('cintura')||
                    !camposMedidas.includes('quadril')||
                    !camposMedidas.includes('comprimento')||
                    !camposMedidas.includes('ombro')||
                    !camposMedidas.includes('costas')||
                    !camposMedidas.includes('comprimento_da_manga')||
                    !camposMedidas.includes('largura_da_manga')
                ){
                    throw new Error('Erro ao cadastrar medida!')
                }
                const cadMedidaSobMedida = await ServiceMedidaSobMedida.cadastrar(infoMedidas)
                return res.json({'boa':'boa'})
            }else{
                throw new Error('Tipo inválido!')
            }
            
        } catch (error) {
            return res.status(500).json({"Erro":`${error.message}`})
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