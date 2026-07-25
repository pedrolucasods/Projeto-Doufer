const {QueryTypes} = require('sequelize')
const sequelize = require('../database')
const modelItemPedidoMedida = require('../models/item_pedido_medida')
const modelMedidaPadrao = require('../models/medidas_padrao')
const modelSobMedida = require('../models/medidas_sob_medida')
const serviceItemPedido = require('./itenspedido')
const ServiceMedidaPadrao = require('./medidaspadrao')
const ServiceMedidaSobMedida = require('./medidassobmedida')

class ItemPedidoMedida{
    async buscar(id){
        const pedidoMedida = await modelItemPedidoMedida.findOne({
            where:{
                id:id
            }
        })
        return pedidoMedida
    }

    async buscarPorItemPedidoId(item_id){
        const pedidoMedida = await modelItemPedidoMedida.findOne({where:{item_pedido_id:item_id}})
        return pedidoMedida
    }

    async dados_formulario_cadastro_medidas_item_pedido(item_id){
        const dados = await sequelize.query(`
            SELECT
                COALESCE(c.nome,c.nome_empresa) AS cliente,
                ip.id_pedido AS pedido_id,
                ip.id AS item_id,
                ip.produto,
                ip.modelo_produto,
                ip.cor,
                ip.quantidade - COALESCE(SUM(ipm.quantidade),0) AS quantidade_disponivel
            FROM item_pedido_medidas ipm
            RIGHT JOIN itens_pedidos ip ON ipm.item_pedido_id = ip.id
            INNER JOIN pedidos p ON ip.id_pedido = p.id
            INNER JOIN clientes c ON p.cliente_id = c.id
            WHERE ip.id = :item_id;
        `,{
            replacements: {item_id,item_id},
            type: QueryTypes.SELECT,
            plain: true
        })
        
        return dados
    }

    async cadastrar(dados){
        try {
            const dadosQuantidade = parseInt(dados.quantidade)
            const itemPedido = await serviceItemPedido.buscaritem(dados.item_pedido_id)

            // validação da quantidade
            const total = itemPedido.quantidade
            const totalItemMedida = await this.somar_quantidadeMedida_registrada(dados.item_pedido_id)
            if(dadosQuantidade>total || ((totalItemMedida+dadosQuantidade)>total) || dadosQuantidade<1 || isNaN(dadosQuantidade)){
                throw new Error('Quantidade inválida!')
                
            }

            

            // se for medida padrão faz isso
            if(dados.tipo_medida=='padrao'){
                let medidaPadrao = {}
                for(const valores of dados.medidas){
                    medidaPadrao = {
                        sexo: valores.sexo,tamanho: valores.tamanho, ajuste: valores.ajuste
                    }
                }

                const item_com_mesma_medida = await this.buscarPorMedidasDoMesmoItem_ComMesmaMedida(dados.item_pedido_id,medidaPadrao,'padrao')
                let valorbool = item_com_mesma_medida?'1':null
                if(valorbool){
                    const quantidade_Antiga = parseInt(item_com_mesma_medida.quantidade)
                    let novaquantidade = dadosQuantidade+quantidade_Antiga
                    let updateQuantidade = await this.editar_quantidade(novaquantidade,item_com_mesma_medida.id)
                    return updateQuantidade
                }else{
                    // cadastro do item pedido medida
                    const cadastro = await sequelize.transaction(async(t)=>{
                        const medida = await modelItemPedidoMedida.create({
                            item_pedido_id:dados.item_pedido_id,
                            tipo_medida:dados.tipo_medida,
                            quantidade:dadosQuantidade
                        },{transaction:t})

                        medidaPadrao.item_medida_id = medida.id
                        medidaPadrao.transacao = t
                        const cadMedidaSobMedida = await ServiceMedidaPadrao.cadastrar(medidaPadrao)
                        return {medida:medida}
                    })
                    return cadastro
                }

            }else if(dados.tipo_medida=='sob_medida'){
                let medidasobMedida = {}
                for(const valores of dados.medidas){
                    medidasobMedida={
                        busto: valores.busto,
                        cintura:valores.cintura,
                        quadril:valores.quadril,
                        comprimento:valores.comprimento,
                        ombro:valores.ombro,
                        costas:valores.costas,
                        comprimento_da_manga:valores.comprimento_da_manga,
                        largura_da_manga:valores.largura_da_manga
                    }
                }
                const item_com_mesma_medida = await this.buscarPorMedidasDoMesmoItem_ComMesmaMedida(dados.item_pedido_id,medidasobMedida,'sobmedida')
                let valorbool = item_com_mesma_medida?'1':null
                if(valorbool){
                    const quantidade_Antiga = parseInt(item_com_mesma_medida.quantidade)
                    let novaquantidade = dadosQuantidade+quantidade_Antiga
                    let updateQuantidade = await this.editar_quantidade(novaquantidade,item_com_mesma_medida.id)
                    return updateQuantidade
                }else{
                        // cadastro do item pedido medida
                        const cadastro = await sequelize.transaction(async(t)=>{
                            const medida = await modelItemPedidoMedida.create({
                                item_pedido_id:dados.item_pedido_id,
                                tipo_medida:dados.tipo_medida,
                                quantidade:dadosQuantidade
                            },{transaction:t})

                            medidasobMedida.item_medida_id = medida.id
                            medidasobMedida.transacao = t
                            const cadMedidaSobMedida = await ServiceMedidaSobMedida.cadastrar(medidasobMedida)
                            return {medida:medida}
                        })
                        
                        return cadastro
                    }
                
            } 
        } catch (error) {
            throw new Error(`${error.message}`)
        }
    }

    async editar_quantidade(quantidade, id){
        const updateQuantidade = await modelItemPedidoMedida.update({
            quantidade:quantidade
            },{
                where:{id:id}
            }
        )
        return updateQuantidade
    }

    async somar_quantidadeMedida_registrada(item_pedido_id){
        const total = 0
        const item = await this.buscarPorItemPedidoId(item_pedido_id)
        if(!item){
            return total
        }
        const totaldb = await modelItemPedidoMedida.sum('quantidade',{where:{item_pedido_id:item_pedido_id}})
        return totaldb
    }

    // consulta para procurar mesmo tamanho padrao para o mesmo item
    async buscarPorMedidasDoMesmoItem_ComMesmaMedida(id,medida,tipo){
        if(tipo == 'padrao'){
            const consulta = await modelItemPedidoMedida.findOne({
            where:{
                item_pedido_id:id
            },attibutes:['id','quantidade'],
            include:[{
                model:modelMedidaPadrao,
                as: 'medidas_padrao_item',
                required: true,
                where:{
                    sexo:medida.sexo,
                    tamanho:medida.tamanho,
                    ajuste:medida.ajuste
                },
                    attibutes: ['tamanho']
                }]
            })
            return consulta
        }
        else if(tipo =='sobmedida'){
            const consulta = await modelItemPedidoMedida.findOne({
                where:{
                    item_pedido_id:id
                },attibutes:['id','quantidade'],
                include:[{
                    model:modelSobMedida,
                    as: 'medidas_sob_medida',
                    required: true,
                    where:{
                        busto: medida.busto,
                        cintura:medida.cintura,
                        quadril:medida.quadril,
                        comprimento:medida.comprimento,
                        ombro:medida.ombro,
                        costas:medida.costas,
                        comprimento_da_manga:medida.comprimento_da_manga,
                        largura_da_manga:medida.largura_da_manga
                    },
                        attibutes: ['busto','cintura','quadril','comprimento','ombro','costas','comprimento_da_manga','largura_da_manga']

                }]
            })
            return consulta
        }
        
    }
}

module.exports = new ItemPedidoMedida()
