const FuncionarioService = require('../services/funcionario')

class Funcionario{
    async listar(req,res){
        try {
            const funcionarios = await FuncionarioService.listar()
            if(funcionarios.length == 0){
                throw new Error("Sem Funcionarios!")
            }
            return res.send(funcionarios)
        } catch (error) {
            return res.redirect(`/clientes?error=${error.message}`)
        }
    }

    async cadastrar(req,res){
        const dados = req.body
        const validar_dados = 
    }
}

module.exports = new Funcionario()