const formulario = document.getElementById('form')

formulario.addEventListener('submit',async function(e){
    e.preventDefault()

    let busto = document.getElementsByName('busto').value
    let cintura = document.getElementsByName('cintura').value
    let quadril = document.getElementsByName('quadril').value
    let comprimento = document.getElementsByName('comprimento').value
    let ombro = document.getElementsByName('ombro').value
    let costas = document.getElementsByName('costas').value
    let comprimento_da_manga = document.getElementsByName('comprimento_da_manga').value
    let largura_da_manga = document.getElementsByName('largura_da_manga').value

    const medidas = {busto,cintura,quadril,comprimento,ombro,costas,comprimento_da_manga,largura_da_manga}
})