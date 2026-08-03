const {QueryTypes} = require('sequelize')
const sequelize = require('../database')
const modelFuncionario = require('../models/funcionarios')
const ClienteService = require('./cliente')
class Funcionario{
    async listar(){
        const funcionarios = await modelFuncionario.findAll()
        return funcionarios
    }

    async buscar_funcionario_pelo_id(id){
        const funcionario = await modelFuncionario.findOne({where:{id:id}})
        return funcionario
    }

    async buscar_funcionario_pelo_nome(nome){
        const funcionario = await modelFuncionario.findOne({
            where:{
                nome:nome
            }
        })
        return funcionario
    }

    async cadastrar(dados){
        const busca_cliente = await ClienteService.buscarCliente(dados.cliente_id)
        if(!busca_cliente || busca_cliente.tipo_cliente != "empresa"){
            throw new Error("Empresa Inválida!")
        }

        const funcionario_mesmo_nome = await this.buscar_funcionario_pelo_nome(dados.nome)
        if(funcionario_mesmo_nome && funcionario_mesmo_nome.cliente_id == dados.cliente_id){
            throw new Error("Funcionario da Mesma Empresa com Mesmo Nome Encontrado!")
        }

        dados.telefone = dados.telefone.replace(/\D/g, '')
        const funcionario = await modelFuncionario.create({
            cliente_id:dados.cliente_id,
            nome:dados.nome,
            telefone:dados.telefone
        })

        return funcionario
    }

    async deletar(id){
        const funcionario = await modelFuncionario.findOne({where:{id:id}})
        if(!funcionario){
            throw new Error("Funcionario Não Encontrado!")
        }
        return await funcionario.destroy()
    }
}

module.exports = new Funcionario()