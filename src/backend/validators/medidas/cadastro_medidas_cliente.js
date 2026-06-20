function ValidatorCadastroMedidaCliente(Dados,res){
    const campos = Object.keys(Dados)
    if(campos.length!=2){
        res.status(400).json({'erro':'Erro ao cadastrar medida do cliente!'})
        return false
        
    }
    if(!campos.includes('tipo_medida') || !campos.includes('medidas')){
        res.status(400).json({'erro':'Erro ao cadastrar medida do cliente!'})
        return false
    }

    const campos_medidas = Object.keys(Dados.medidas[0])
    if(Dados.tipo_medida == 'padrao'){
        if (
            !campos_medidas.includes('cliente_id') ||
            !campos_medidas.includes('tamanho') ||
            !campos_medidas.includes('ajuste')
            ) {
                res.status(400).json({'erro':'Erro ao cadastrar medida!'})
                return false
            }
            if (campos_medidas.length != 3) {
                res.status(400).json({'erro':'Erro ao cadastrar medida!'})
                return false
            }
    }else if(Dados.tipo_medida == 'sob_medida'){
        if (campos_medidas.length != 9) {
            res.status(400).json({'erro':'Erro ao cadastrar medida!'})
            return false
        }
        if (
            !campos_medidas.includes('cliente_id') ||
            !campos_medidas.includes('busto') ||
            !campos_medidas.includes('cintura') ||
            !campos_medidas.includes('quadril') ||
            !campos_medidas.includes('comprimento') ||
            !campos_medidas.includes('ombro') ||
            !campos_medidas.includes('costas') ||
            !campos_medidas.includes('comprimento_da_manga') ||
            !campos_medidas.includes('largura_da_manga')
        ) {
            res.status(400).json({'erro':'Erro ao cadastrar medida!'})
            return false
        }
    }else{
        res.status(400).json({'erro':'Tipo de medida inválida!'})
        return false
    }
    return true
}

module.exports = {ValidatorCadastroMedidaCliente}