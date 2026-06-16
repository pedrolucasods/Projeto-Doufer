
async function ValidatorEdicaoCliente(Dados,res){
    if((!Dados.tipo_cliente === '') || (Dados.tipo_cliente != 'empresa' && Dados.tipo_cliente != 'pessoa')){
        res.status(400).json({'erro':'Tipo do cliente inválido!'})
        return false
    }
    
    if(Dados.tipo_cliente === 'empresa' && Dados.nome_empresa === ''){
        res.status(400).json({'erro':'Informe o nome da empresa!'})
        return false
    }
    if(Dados.tipo_cliente === 'pessoa' && Dados.nome === ''){
        res.status(400).json({'erro':'Informe seu nome!'})
        return false
    }   
    return true
}

module.exports = {ValidatorEdicaoCliente}