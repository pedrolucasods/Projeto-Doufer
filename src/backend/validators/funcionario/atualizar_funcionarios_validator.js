async function ValidatorAtualizarFuncionario(Dados,res){
    const campos = Object.keys(Dados)
    if(campos.length < 3){
        res.status(400).json({'erro':'Campos Inválidos!'})
        return false
    }

    if(!campos.includes('funcionario_id') || !campos.includes('nome') || !campos.includes("telefone")){
        res.status(400).json({'erro':'Campos Inválidos!'})
        return false
    }

    if((Dados.nome).length < 3 || Number.isNaN(Dados.nome)){
        res.status(400).json({'erro':'Nome Inválido!'})
        return false
    }

    const validator_telefone = /^[0-9()-\s]+$/
    const numero_telefone = (Dados.telefone).replace(/\D/g, '')
    if(Dados.telefone && typeof Dados.telefone === 'string' && (
        !validator_telefone.test(Dados.telefone) || (numero_telefone.length>11 || numero_telefone.length<10))){
        res.status(400).json({'erro':'Telefone Inválido!'})
        return false
    }

    return true
}

module.exports = {ValidatorAtualizarFuncionario}