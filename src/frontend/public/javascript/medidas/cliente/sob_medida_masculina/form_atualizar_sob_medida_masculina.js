const form = document.getElementById('form')
document.addEventListener('DOMContentLoaded',()=>{
    mascaras()
})
form.addEventListener('submit', async function (e) {
    e.preventDefault()
    // pegando o id do cliente
    const clienteId = sessionStorage.getItem('clienteId')
    let medidaId = sessionStorage.getItem('medida_id_sob_masculina')
    console.log(medidaId)

    let Medidas = {
        sexo: "masculino",
        ombro : document.getElementById('inputOmbro').value,
        circunferencia_torax : document.getElementById('inputCircunferenciaTorax').value,
        circunferencia_abdomen : document.getElementById('inputCircunferenciaAbdomen').value,
        costa : document.getElementById('inputCosta').value,
        comprimento_manga : document.getElementById('inputComprimentoManga').value,
        largura_punho : document.getElementById('inputLarguraPunho').value,
        largura_manga : document.getElementById('inputLarguraManga').value,
        comprimento_corpo : document.getElementById('inputComprimentoCorpo').value
    }

    console.log(Medidas)
    let contatador_medidas_vazias = 0
    Object.values(Medidas).forEach( valor =>{
        if(valor == ""){
            contatador_medidas_vazias += 1
        }
    })
    if(contatador_medidas_vazias == 7){
        deletarMedidaSobMedida(medidaId,clienteId)
    }else if(contatador_medidas_vazias < 7){
        Medidas.medida_id = medidaId
        Medidas.cliente_id = clienteId
        const dados = {
            tipo_medida:"sob_medida",
            medidas:[Medidas]
        }
        atualizarMedida(dados,clienteId)
    }

})

async function deletarMedidaSobMedida(medidaId, clienteId) {
    try {
        const dados = {tipo:"sob_medida",medida_id:medidaId,cliente_id:clienteId}
        const response = await fetch(`/medidas/clientes`,{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(dados)
        })
        const data = await response.json()
        if(!response.ok){
            throw new Error(data.erro)
        }
        window.location.href = `/medidas/clientes/listar/${clienteId}?msg=${data.msg}`
     } catch (error) {
        const erro = error
        window.location.href= `/medidas/clientes/listar/${clienteId}?error=${erro}`
     }
}

async function atualizarMedida(dados,clienteId){
    try {
        const response = await fetch('/medidas/clientes',{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(dados)
        })
        const data = await response.json()
        if(!response.ok){
            throw new Error(data.erro)
        }
        window.location.href = `/medidas/clientes/listar/${clienteId}?msg=${data.msg}`
    } catch (error) {
        window.location.href = `/medidas/clientes/${dados.medidas[0].medida_id}/sob/masculina?error=${error}`
    }
}

function mascaras(){
    const inputOmbro = document.getElementById('inputOmbro')
    mask(inputOmbro)
    
    const inputCircunferenciaTorax = document.getElementById('inputCircunferenciaTorax')
    mask(inputCircunferenciaTorax)

    const inputCircunferenciaAbdomen = document.getElementById('inputCircunferenciaAbdomen')
    mask(inputCircunferenciaAbdomen)

    const inputCosta = document.getElementById('inputCosta')
    mask(inputCosta)

    const inputComprimentoManga = document.getElementById('inputComprimentoManga')
    mask(inputComprimentoManga)

    const inputLarguraPunho = document.getElementById('inputLarguraPunho')
    mask(inputLarguraPunho)

    const inputLarguraManga = document.getElementById('inputLarguraManga')
    mask(inputLarguraManga)

    const inputComprimentoCorpo = document.getElementById('inputComprimentoCorpo')
    mask(inputComprimentoCorpo)
}


function mask(input){
    IMask(input,{
        mask:'000cm'
    })

}

function voltar(){
    const clienteId = sessionStorage.getItem('clienteId')
    window.location.href = `/medidas/clientes/listar/${clienteId}`   
}




