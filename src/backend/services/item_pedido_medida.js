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
                        sexo:valores.sexo,
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

    async dados_formulario_atualizar(medida_id){
        let dados = await sequelize.query(`
            WITH TotalUsado AS(
                SELECT
                    item_pedido_id,
                    COALESCE(SUM(quantidade),0) AS quantidade_usada
                FROM item_pedido_medidas
                GROUP BY item_pedido_id
            )
            SELECT
                c.nome AS nome_cliente,
                p.id AS pedido_id,
                ip.produto AS produto,
                ip.modelo_produto AS modelo,
                ip.cor AS cor,
                ip.id AS item_id,
                ipm.tipo_medida AS tipo_medida,
                ipm.id AS vinculo_medida_id,
                ip.quantidade - COALESCE(SUM(t.quantidade_usada),0) + ipm.quantidade AS quantidade_disponivel,
                ipm.quantidade AS quantidade_medida,
                CASE 
                    WHEN ipm.tipo_medida = 'padrao' THEN 
                        json_object(
                            'sexo',mp.sexo,
                            'tamanho',mp.tamanho,
                            'ajuste',mp.ajuste
                        )
                    WHEN ipm.tipo_medida = 'sob_medida' THEN
                        json_object(
                            'sexo',msm.sexo,
                            'busto',msm.busto,
                            'cintura',msm.cintura,
                            'quadril',msm.quadril,
                            'comprimento',msm.comprimento,
                            'ombro',msm.ombro,
                            'costas',msm.costas,
                            'comprimento_da_manga',msm.comprimento_da_manga,
                            'largura_da_manga',msm.largura_da_manga
                        ) 
                END AS medidas
                FROM item_pedido_medidas ipm
                    LEFT JOIN medidas_padrao mp ON mp.item_pedido_medida_id = ipm.id
                    LEFT JOIN medidas_sob_medidas msm ON msm.item_pedido_medida_id = ipm.id
                    INNER JOIN itens_pedidos ip ON ipm.item_pedido_id = ip.id
                    INNER JOIN TotalUsado t ON t.item_pedido_id = ip.id
                    INNER JOIN pedidos p ON ip.id_pedido = p.id
                    INNER JOIN clientes c ON p.cliente_id = c.id
                WHERE 
                    (ipm.tipo_medida = 'padrao' AND mp.id = :id)
                    OR
                    (ipm.tipo_medida = 'sob_medida' AND msm.id = :id)`,
        {
            replacements: {id:medida_id},
            type: QueryTypes.SELECT,
            plain: true
        })

        dados.medidas = JSON.parse(dados.medidas)
        return dados
    }

    async atualizar(dados){
        try {
            const dadosQuantidade = parseInt(dados.quantidade)
            const vinculo_medida = await this.buscar(dados.item_pedido_medida_id)
            if(!vinculo_medida){
                throw new Error('Falha ao encontrar Medida!')
            }
            if(vinculo_medida.tipo_medida != dados.tipo_medida){
                throw new Error('Tipo De Medida Inválido!')
            }
            const itemPedido = await serviceItemPedido.buscaritem(vinculo_medida.item_pedido_id)

            // validação da quantidade
            const total = itemPedido.quantidade
            const totalItemMedida = (await this.somar_quantidadeMedida_registrada(vinculo_medida.item_pedido_id)) - parseInt(vinculo_medida.quantidade)
            if(dadosQuantidade>total || ((totalItemMedida+dadosQuantidade)>total) || dadosQuantidade<1 || isNaN(dadosQuantidade)){
                throw new Error('Quantidade inválida!')
            }

            

            // se for medida padrão faz isso
            if(dados.tipo_medida=='padrao'){
                const busca_medida = await ServiceMedidaPadrao.buscarPorItemPedidoMedidaIdEMedidaId(dados.medida_id,vinculo_medida.id)
                if(!busca_medida){
                    throw new Error('Medida Não Encontrada!')
                }
                let medidaPadrao = {}
                for(const valores of dados.medidas){
                    medidaPadrao = {
                        sexo: valores.sexo,tamanho: valores.tamanho, ajuste: valores.ajuste
                    }
                }

                const item_com_mesma_medida = await this.buscarPorMedidasDoMesmoItem_ComMesmaMedida(vinculo_medida.item_pedido_id,medidaPadrao,'padrao')
                let valorbool = item_com_mesma_medida?'1':null
                if(valorbool){
                    let novaquantidade = dadosQuantidade
                    if(item_com_mesma_medida.id != vinculo_medida.id){
                        await this.deletar(vinculo_medida.id)
                        const quantidade_Antiga = parseInt(item_com_mesma_medida.quantidade)
                        novaquantidade=dadosQuantidade+quantidade_Antiga
                    }
                    let updateQuantidade = await this.editar_quantidade(novaquantidade,item_com_mesma_medida.id)
                    return updateQuantidade
                }else{
                    // cadastro do item pedido medida
                    const atualizacao = await sequelize.transaction(async(t)=>{
                        await vinculo_medida.update({
                            quantidade:dadosQuantidade
                        },{transaction:t})

                        medidaPadrao.medida_id = dados.medida_id
                        medidaPadrao.transacao = t
                        medidaPadrao.item_medida_id = vinculo_medida.id
                        const atualizar_medida = await ServiceMedidaPadrao.atualizar(medidaPadrao)
                        return {medida:vinculo_medida}
                    })
                    return atualizacao
                }

            }else if(dados.tipo_medida=='sob_medida'){
                const busca_medida = await ServiceMedidaSobMedida.buscarPorItemPedidoMedidaIdEMedidaId(dados.medida_id,vinculo_medida.id)
                if(!busca_medida){
                    throw new Error('Medida Não Encontrada!')
                }
                let medidasobMedida = {}
                for(const valores of dados.medidas){
                    medidasobMedida={
                        sexo:valores.sexo,
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
                const item_com_mesma_medida = await this.buscarPorMedidasDoMesmoItem_ComMesmaMedida(vinculo_medida.item_pedido_id,medidasobMedida,'sobmedida')
                let valorbool = item_com_mesma_medida?'1':null
                if(valorbool){
                    let novaquantidade = dadosQuantidade
                    if(item_com_mesma_medida.id != vinculo_medida.id){
                        await this.deletar(vinculo_medida.id)
                        const quantidade_Antiga = parseInt(item_com_mesma_medida.quantidade)
                        novaquantidade=dadosQuantidade+quantidade_Antiga
                    }
                    let updateQuantidade = await this.editar_quantidade(novaquantidade,item_com_mesma_medida.id)
                    return updateQuantidade
                }else{
                        // cadastro do item pedido medida
                        const atualizacao = await sequelize.transaction(async(t)=>{
                            await vinculo_medida.update({
                            quantidade:dadosQuantidade
                        },{transaction:t})

                            medidasobMedida.medida_id = dados.medida_id
                            medidasobMedida.item_medida_id = vinculo_medida.id
                            medidasobMedida.transacao = t
                            const cadMedidaSobMedida = await ServiceMedidaSobMedida.atualizar(medidasobMedida)
                            return {medida:vinculo_medida}
                        })
                        
                        return atualizacao
                    }
                
            } 
        } catch (error) {
            throw new Error(`${error.message}`)
        }
    }

    async deletar(id){
        const vinculo_medida = await modelItemPedidoMedida.findOne({where:{id:id}})
        if(!vinculo_medida){
            throw new Error('Vinculo Não encontrado!')
        }
        return await vinculo_medida.destroy()
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
                        sexo:medida.sexo,
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
