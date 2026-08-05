const FuncionarioService = require('../services/funcionario')
const {ValidatorCadastroFuncionario} = require('../validators/funcionario/cadastro_funcionarios_validator')
const {ValidatorAtualizarFuncionario} = require('../validators/funcionario/atualizar_funcionarios_validator')

class Funcionario{
    async listar(req,res){
        try {
            const cliente_id = req.params.id
            const funcionarios = await FuncionarioService.listar(cliente_id)
            // return res.send(funcionarios)
            return res.render('funcionarios',{
                stylesheet:'funcionarios.css',
                script:'funcionarios.js',
                ...funcionarios,
                error:req.query.error || null,
                msg: req.query.msg || null
            })
        } catch (error) {
            return res.redirect(`/clientes?error=${error.message}`)
        }
    }

    async buscar_funcionario(req,res){
        try {
            const funcionario = await FuncionarioService.buscar_funcionario_pelo_id(req.params.id)
            if(!funcionario){
                throw new Error("Funcionario Não Encontrado!")
            }
            return res.send(funcionario)
        } catch (error) {
            return res.redirect(`/funcionarios?error=${error.message}`)
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

    async atualizar(req,res){
        try {
            const dados = req.body
            const validar_dados = await ValidatorAtualizarFuncionario(dados,res)
            if(!validar_dados){
                return
            }
            const atualizar = await FuncionarioService.atualizar(dados)
            return res.json({
                "msg":`${atualizar.nome} foi Atualizado!`
            })
        } catch (error) {
            return res.status(500).json({"Erro":`${error.message}`})
        }
    }

    async deletar(req,res){
        try {
            const deletar = await FuncionarioService.deletar(req.params.id)
            return res.json({"msg":"Funcionario Deletado!"})
        } catch (error) {
            return res.redirect(`/funcionarios?error=${error.message}`)
        }
    }
}

module.exports = new Funcionario()