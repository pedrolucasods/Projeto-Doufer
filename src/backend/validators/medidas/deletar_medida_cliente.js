async function ValidatorDeletarMedidaCliente(Dados,res){
    const campos = Object.keys(Dados)
    if((campos.length !=4) || (!campos.includes('tipo_medida') || !campos.includes('medida_id')) || !campos.includes('cliente_id') || !campos.includes('medidas')){
        res.status(400).json({'erro':'Erro ao deletar Medida!'})
        return false
    }
    if(Dados.tipo_medida != 'padrao' && Dados.tipo_medida != 'sob_medida'){
        res.status(400).json({'erro':'Tipo de Medida Inválida!'})
        return false
    }
    const sexos = ['masculino','feminino']
    if(!sexos.includes(Dados.medidas[0].sexo)){
        res.status(400).json({'erro':'Tipo de Medida Inválida!'})
        return false
    }

    return true
}

module.exports = {ValidatorDeletarMedidaCliente}