const cliente = require('../controllers/cliente')
const modelCliente = require('../models/cliente')

class ClienteService{
    async listarTodos(){
        const cliente = await modelCliente.findAll()
        return cliente
    }

    async buscarCliente(parametro){
        if(parametro.includes('.') && parametro.includes('-')){
            const cliente = modelCliente.findOne({where:{'cpf':parametro}})
            if(!cliente){
                throw new Error('Erro, cliente não encontrado!')
            }
            return cliente
        }
        const cliente = modelCliente.findOne({where:{'id':parametro}})
        if(!cliente){
            throw new Error('Erro, cliente não encontrado!')
        }
        return cliente
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