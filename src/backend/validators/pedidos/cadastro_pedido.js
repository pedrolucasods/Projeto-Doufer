async function ValidatorCadastroPedido(Dados,res){
    const campos = Object.keys(Dados)
    if(!Dados || campos.length!=4 || (
        !campos.includes('clienteId') ||
        !campos.includes('data') ||
        !campos.includes('itens') ||
        !campos.includes('tipo_cliente'))){
            res.status(400).json({'erro':'Campos inválidos'})
            return false
        }

    return true
}

module.exports = {ValidatorCadastroPedido}