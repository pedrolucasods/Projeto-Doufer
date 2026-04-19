const ServiceMedidaPadrao = require('../services/medidaspadrao')
const ServiceItemPedidoMedida = require('../services/item_pedido_medida')

class Medida{
    async cadastrar(req,res){
        try {
            const dados = req.body
            const totalDeCampos = Object.keys(dados).length
            const campos = Object.keys(dados)
            if(
                (!campos.includes('cliente_id')&&
                !campos.includes('item_medida_id'))||
                !campos.includes('tamanho')||
                !campos.includes('ajuste')
            ){
                throw new Error("Erro ao cadastrar medida!")
            }

            if(totalDeCampos!=3){
                throw new Error("Erro ao cadastrar medida!")
            }
            if(dados.cliente_id && dados.item_medida_id){
                throw new Error("Erro ao cadastrar medida!")
            }
            console.log(dados)
            const cadMedidaPadrao = await ServiceMedidaPadrao.cadastrar(dados)
            return res.send(cadMedidaPadrao)
        } catch (error) {
            return res.status(500).json({"Erro":`${error.message}`})
        }
    }
}

module.exports = new Medida()