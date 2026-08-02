async function ValidatorCadastroFuncionario(Dados,res){
    const campos = Object.keys(Dados)
    if(campos.length < 3){
        res.status(400).json({'erro':'Campos Inválidos!'})
        return false
    }

    if(!campos.includes('cliente_id') || !campos.includes('nome') || !campos.includes("telefone")){
        res.status(400).json({'erro':'Campos Inválidos!'})
        return false
    }

    return true
}

module.exports = {ValidatorCadastroFuncionario}