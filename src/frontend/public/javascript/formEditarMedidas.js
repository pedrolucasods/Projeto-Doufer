const form = document.getElementById('form')
document.addEventListener('DOMContentLoaded',()=>{
    mascaras()
})
form.addEventListener('submit', async function (e) {
    e.preventDefault()
    // pegando o id do cliente
    const url = window.location.pathname
    const partes = url.split('/')
    const clienteId = partes[partes.length - 1]
    console.log(`${url}\n${partes}\n${clienteId}`)
    // montando o body
    let busto = document.getElementById('inputBusto').value
    let cintura = document.getElementById('inputCintura').value
    let quadril = document.getElementById('inputQuadril').value
    let comprimento = document.getElementById('inputComprimento').value
    let ombro = document.getElementById('inputOmbro').value
    let costas = document.getElementById('inputCostas').value
    let comprimento_da_manga = document.getElementById('inputCManga').value
    let largura_da_manga = document.getElementById('inputLManga').value

    let medidaId = document.getElementById('medidaId').value

    const Medidas = {
        busto: (busto != null) ? busto : null,
        cintura: (cintura != null) ? cintura : null,
        quadril: (quadril != null) ? quadril : null,
        comprimento: (comprimento != null) ? comprimento : null,
        ombro: (ombro != null) ? ombro : null,
        costas: (costas != null) ? costas : null,
        comprimento_da_manga: (comprimento_da_manga != null) ? comprimento_da_manga : null,
        largura_da_manga: (largura_da_manga != null) ? largura_da_manga : null
    }

    let contatador_medidas_vazias = 0
    Object.values(Medidas).forEach( valor =>{
        if(valor == ""){
            contatador_medidas_vazias += 1
        }
    })
    if(contatador_medidas_vazias == 8){
        limparMedidas(medidaId,clienteId)
    }else if(contatador_medidas_vazias < 8){
        atualizarMedidas(clienteId, Medidas)
    }

})

async function limparMedidas(medidaId, clienteId) {
    try {
        const response = await fetch(`/api/clientes/medidas/${medidaId}`,{
            method:"DELETE"
        })
        const data = await response.json()
        window.location.href = (`/clientes/medidas/listar/${clienteId}?msg=${data.msg}`)
    } catch (error) {
        window.location.href = (`/clientes/medidas/listar/${clienteId}?msg=${error}`)
    }
}

async function atualizarMedidas(clienteId, Medidas) {
    try {
        const response = await fetch(`/api/clientes/medidas/${clienteId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Medidas)
        })
        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`)
        }
        const data = await response.json()
        window.location.href = `/clientes/detalhes/${clienteId}?msg=${data.msg}`
    } catch (error) {
        window.location.href = `/clientes/medidas/editar/${clienteId}?error=${error}`
    }

}

function mascaras(){
    let inputBusto = document.getElementById('inputBusto')
    mask(inputBusto)
    
    

    const inputCintura = document.getElementById('inputCintura')
    mask(inputCintura)

    const inputQuadril = document.getElementById('inputQuadril')
    mask(inputQuadril)

    const inputComprimento = document.getElementById('inputComprimento')
    mask(inputComprimento)

    const inputOmbro = document.getElementById('inputOmbro')
    mask(inputOmbro)

    const inputCostas = document.getElementById('inputCostas')
    mask(inputCostas)

    const inputCManga = document.getElementById('inputCManga')
    mask(inputCManga)

    const inputLManga = document.getElementById('inputLManga')
    mask(inputLManga)
}


function mask(input){
    IMask(input,{
        mask:'000cm'
    })

}




