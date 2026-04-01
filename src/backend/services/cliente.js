const modelCliente = require('../models/cliente')

class ClienteService{
    async listarTodos(){
        const cliente = await modelCliente.findAll()
        return cliente
    }

    buscarCliente(parametro){
        if(parametro.includes('.') && parametro.includes('-')){
            return modelCliente.findOne({where:{'cpf':parametro}})
        }
        return modelCliente.findOne({where:{'id':parametro}})
    }

    async cadastrar(nome,telefone,cpf,nome_empresa,tipo_cliente){
        return  modelCliente.create({
                    nome:nome,
                    telefone: telefone,
                    cpf: cpf,
                    nome_empresa: nome_empresa,
                    tipo_cliente: tipo_cliente
                })
    }

    editar(idcliente,nomecliente,telefonecliente,cpfcliente,nomeclienteEmpresa,tipo_cliente){
        return modelCliente.update({
                nome:nomecliente,
                telefone: telefonecliente,
                cpf: cpfcliente,
                nome_empresa: nomeclienteEmpresa,
                tipo_cliente: tipo_cliente
            },{
                where:{
                    id: idcliente
                }
            })
    }

    deletar(idcliente){
        return modelCliente.destroy({where:{'id':idcliente}})
    }

    detalhes(id){
        return modelCliente.findOne({where:{
                'id':id
            }})
    }
}

module.exports = new ClienteService()