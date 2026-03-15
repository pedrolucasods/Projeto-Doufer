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
    const Medidas = {
        busto: document.getElementById('inputBusto').value,
        cintura: document.getElementById('inputCintura').value,
        quadril: document.getElementById('inputQuadril').value,
        comprimento: document.getElementById('inputComprimento').value,
        ombro: document.getElementById('inputOmbro').value,
        costas: document.getElementById('inputCostas').value,
        comprimento_da_manga: document.getElementById('inputCManga').value,
        largura_da_manga: document.getElementById('inputLManga').value
    }

    atualizarMedidas(clienteId, Medidas)

})

async function atualizarMedidas(clienteId, Medidas) {
    try {
        const response = await fetch(`/clientes/medidas/editar/${clienteId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Medidas)
        })
        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`)
        }
        window.location.href = `/clientes/detalhes/${clienteId}`
    } catch (error) {
        console.error(`Falha ao atualizar as medidas: ${error}`)
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




