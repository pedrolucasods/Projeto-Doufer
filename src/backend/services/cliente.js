const modelCliente = require('../models/cliente')

class ClienteService{
    async listarTodos(){
        const cliente = await modelCliente.findAll()
        return cliente
    }

    buscarCliente(idcliente){
        return modelCliente.findOne({where:{'id':idcliente}})
    }

    async cadastrar(nome,telefone,cpf,nome_empresa){
        return  modelCliente.create({
                    nome:nome,
                    telefone: telefone,
                    cpf: cpf,
                    nome_empresa: nome_empresa
                })
    }

    editar(idcliente,nomecliente,telefonecliente,cpfcliente,nomeclienteEmpresa){
        return modelCliente.update({
                nome:nomecliente,
                telefone: telefonecliente,
                cpf: cpfcliente,
                nome_empresa: nomeclienteEmpresa
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