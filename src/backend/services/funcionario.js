const {QueryTypes} = require('sequelize')
const sequelize = require('../database')
const modelFuncionario = require('../models/funcionarios')
const ClienteService = require('./cliente')
class Funcionario{
    async listar(cliente_id){
        const cliente = await ClienteService.buscarCliente(cliente_id)
        if(!cliente || cliente.tipo_cliente != "empresa"){
            throw new Error("Empresa Não Encontrada!")
        }
        // const funcios = await modelFuncionario.findAll({where:{cliente_id:cliente.id}})
        let dados = await sequelize.query(`
            SELECT
                c.nome_empresa,
                JSON_GROUP_ARRAY(
                    JSON_OBJECT(
                        'id',f.id,
                        'nome',f.nome,
                        'telefone',f.telefone
                    )
                ) AS funcionarios
            FROM funcionarios f
            INNER JOIN clientes c ON f.cliente_id = c.id
            WHERE c.id = :id;
        `,{
            replacements:{id:cliente.id},
            type:QueryTypes.SELECT,
            plain:true
        })

        dados.funcionarios = JSON.parse(dados.funcionarios)
        return dados
    }

    async buscar_funcionario_pelo_id(id){
        const funcionario = await modelFuncionario.findOne({where:{id:id}})
        return funcionario
    }

    async buscar_funcionario_pelo_nome_e_clienteId(nome,cliente_id){
        const funcionario = await modelFuncionario.findOne({
            where:{
                cliente_id:cliente_id,
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

        const funcionario_mesmo_nome = await this.buscar_funcionario_pelo_nome_e_clienteId(dados.nome,dados.cliente_id)
        if(funcionario_mesmo_nome){
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

    async atualizar(dados){
        const funcionario = await this.buscar_funcionario_pelo_id(dados.funcionario_id)
        if(!funcionario){
            throw new Error("Funcionario Não Encontrado!")
        }

        const funcionario_mesmo_nome = await this.buscar_funcionario_pelo_nome_e_clienteId(dados.nome,funcionario.cliente_id)
        if(
            funcionario_mesmo_nome && 
            funcionario_mesmo_nome.id != funcionario.id
        ){
            throw new Error("Já Existe um Funcionario Com Esse Nome Nessa Empresa!")
        }

        dados.telefone = dados.telefone.replace(/\D/g, '')
        return await funcionario.update({
            nome:dados.nome,
            telefone:dados.telefone
        })
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