const {QueryTypes} = require('sequelize')
const sequelize = require('../database')
const modelFuncionario = require('../models/funcionarios')

class Funcionario{
    async listar(){
        const funcionarios = await modelFuncionario.findAll()
        return funcionarios
    }
}

module.exports = new Funcionario()