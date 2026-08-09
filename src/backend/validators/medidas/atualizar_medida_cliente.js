function ValidatorAtualizarMedidaCliente(Dados, res) {
    const campos = Object.keys(Dados)
    if (campos.length != 2) {
        res.status(400).json({ 'erro': 'Erro ao atualizar medida!' })
        return false
    }
    if (!campos.includes('tipo_medida') || !campos.includes('medidas')) {
        res.status(400).json({ 'erro': 'Erro ao atualizar medida!' })
        return false
    }

    const sexos = ['masculino','feminino']
    if(!sexos.includes(Dados.medidas[0].sexo)){
        res.status(400).json({'erro':'Erro ao atualizar medida!'})
        return false
    }

    const campos_medidas = Object.keys(Dados.medidas[0])
    if (Dados.tipo_medida == 'padrao') {
        const valores_tamanho_padrao = ['','P','PP','M','G','GG','EXG','SEGUIR MEDIDA']
        const sexos = ['masculino','feminino']
        if (
            !campos_medidas.includes('medida_id') ||
            !campos_medidas.includes('cliente_id') ||
            !campos_medidas.includes('sexo') ||
            !campos_medidas.includes('tamanho') ||
            !campos_medidas.includes('ajuste')
        ) {
            res.status(400).json({ 'erro': 'Erro ao atualizar medida!' })
            return false
        }
        if (campos_medidas.length != 5) {
            res.status(400).json({ 'erro': 'Erro ao atualizar medida!' })
            return false
        }
        if (!valores_tamanho_padrao.includes(Dados.medidas[0].tamanho)){
            res.status(400).json({ 'erro': 'Erro ao atualizar medida!' })
            return false
        }
    } else if (Dados.tipo_medida == 'sob_medida') {
        if (campos_medidas.length != 11) {
            res.status(400).json({ 'erro': 'Erro ao atualizar medida!' })
            return false
        }
        if(Dados.medidas[0].sexo == "feminino"){
            if (
                !campos_medidas.includes('medida_id') ||
                !campos_medidas.includes('sexo') ||
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
                res.status(400).json({ 'erro': 'Erro ao atualizar medida!' })
                return false
            }
        }else if(Dados.medidas[0].sexo == "masculino"){
            if(
                !campos_medidas.includes('cliente_id') ||
                !campos_medidas.includes('medida_id'),
                !campos_medidas.includes('sexo') ||
                !campos_medidas.includes('ombro') ||
                !campos_medidas.includes('circunferencia_torax') ||
                !campos_medidas.includes('circunferencia_abdomen') ||
                !campos_medidas.includes('costa') ||
                !campos_medidas.includes('comprimento_da_manga') ||
                !campos_medidas.includes('largura_punho') ||
                !campos_medidas.includes('largura_da_manga') ||
                !campos_medidas.includes('comprimento_corpo')
            ){
                res.status(400).json({ 'erro': 'Gênero inválido!' })
                return false
            }
        }
    }else{
        res.status(400).json({ 'erro': 'Tipo de medida inválido!' })
        return false
    }
    return true
}

module.exports = { ValidatorAtualizarMedidaCliente }