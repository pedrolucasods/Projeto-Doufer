const cliente = require('../controllers/cliente')
const modelCliente = require('../models/cliente')

class ClienteService{
    async listar_todos(){
        const cliente = await modelCliente.findAll()
        return cliente
    }

    async listarClientesPessoa(){
        const clientes = await modelCliente.findAll({where:{'tipo_cliente':'pessoa'}})
        return clientes
    }

    async listarClientesEmpresa(){
        const clientesEmpresa = await modelCliente.findAll({where:{'tipo_cliente':'empresa'}})
        return clientesEmpresa
    }

    async buscarCliente(parametro){
        let cliente = ''
        if(parametro.includes('.') && parametro.includes('-')){
            cliente = await modelCliente.findOne({where:{'cpf':parametro}})
            if(!cliente){
                throw new Error('Erro, cliente não encontrado!')
            }
        }else{
            cliente = await modelCliente.findOne({where:{'id':parametro}})
            if(!cliente){
                throw new Error('Erro, cliente não encontrado!')
            }
        }
        
        return cliente
    }

    async cadastrar(Dados){
        if(Dados.cpf){
            let cpfregister = await this.buscarCliente(Dados.cpf)
            if(cpfregister){
                throw new Error('Cpf ja cadastrado!')
            }
        }
        return  modelCliente.create({
                    nome:Dados.nome,
                    telefone: Dados.telefone,
                    cpf: Dados.cpf,
                    nome_empresa: Dados.nome_empresa,
                    tipo_cliente: Dados.tipo_cliente
                })
    }

    async editar(Dados){
        const busca_cliente = await this.buscarCliente(Dados.cliente_id)
        if(!busca_cliente){
            throw new Error('Cliente não encontrado')
        }
        if(Dados.cpf){
        let cpfregister = await this.buscarCliente(Dados.cpf)
        if(cpfregister && cpfregister.id != Dados.cliente_id){
            throw new Error('Cpf ja cadastrado!')
        }
    }
        return modelCliente.update({
                nome:Dados.nomecliente,
                telefone: Dados.telefonecliente,
                cpf: Dados.cpfcliente,
                nome_empresa: Dados.nomeclienteEmpresa,
                tipo_cliente: Dados.tipo_cliente
            },{
                where:{
                    id: Dados.cliente_id
                }
            })
    }

    async deletar(idcliente){
        const busca_cliente = await this.buscarCliente(idcliente)
        if(!busca_cliente){
            throw new Error('Cliente não encontrado!')
        }
        return modelCliente.destroy({where:{'id':idcliente}})
    }

    async detalhes(id){
        const busca_cliente = await this.buscarCliente(id)
        if(!busca_cliente){
            throw new Error('Cliente não encontrado!')
        }
        return busca_cliente
    }
}

module.exports = new ClienteService()