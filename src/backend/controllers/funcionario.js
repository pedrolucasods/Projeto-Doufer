const FuncionarioService = require('../services/funcionario')
const {ValidatorCadastroFuncionario} = require('../validators/funcionario/cadastro_funcionarios_validator')

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
        try {
            const dados = req.body
            const validar_dados = await ValidatorCadastroFuncionario(dados,res)
            if(!validar_dados){
                return
            }
            const cadastro = await FuncionarioService.cadastrar(dados)
            return res.json({
                "msg":"Funcionario Cadastrado!"
            }) 
        } catch (error) {
            return res.status(500).json({"Erro":`${error.message}`})
        }
        
    }
}

module.exports = new Funcionario()