async function ValidatorTipoClienteForms(tipoCliente,res){
    if(!tipoCliente || (tipoCliente != 'pessoa' && tipoCliente != 'empresa')){
        res.status(400).json({'erro':'Tipo inválido!'})
        return false
    }
    return true
}

module.exports = {ValidatorTipoClienteForms}