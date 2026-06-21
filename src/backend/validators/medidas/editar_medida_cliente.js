function ValidatorEditarMedidaCliente(Dados,res){
    const campos = Object.keys(Dados)
    if(campos.length!=2){
        throw new Error('Erro ao cadastrar medida do cliente!')
    }
    if(!campos.includes('tipo_medida') || !campos.includes('medidas')){
        throw new Error('Erro ao cadastrar medida do cliente!')
    }
}

module.exports = {ValidatorEditarMedidaCliente}