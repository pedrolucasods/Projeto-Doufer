const modelCliente = require('../models/cliente')

class ClienteService{
    async listarTodos(){
        const cliente = await modelCliente.findAll()
        return cliente
    }

    async cadastrar(nome,telefone,cpf,nome_empresa){
        return  modelCliente.create({
                    nome:nome,
                    telefone: telefone,
                    cpf: cpf,
                    nome_empresa: nome_empresa
                })
    }
}

module.exports = new ClienteService()