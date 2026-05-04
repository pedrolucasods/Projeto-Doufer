document.addEventListener('DOMContentLoaded',()=>{
    mascaras()
    const form = document.getElementById('form')
    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        const url = window.location.pathname
        const partes = url.split('/')
        const clienteId = sessionStorage.getItem('clienteId')
        const dados = {
            tipo_medida:"sob_medida",
            medidas:[
                {
                    cliente_id:clienteId,
                    busto : document.getElementById('inputBusto').value,
                    cintura : document.getElementById('inputCintura').value,
                    quadril : document.getElementById('inputQuadril').value,
                    comprimento : document.getElementById('inputComprimento').value,
                    ombro : document.getElementById('inputOmbro').value,
                    costas : document.getElementById('inputCostas').value,
                    comprimento_da_manga : document.getElementById('inputCManga').value,
                    largura_da_manga : document.getElementById('inputLManga').value
                }
            ]
            
        }
        
        adicionarMedida(dados,clienteId)
    })
})

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

async function adicionarMedida(medidas,clienteId){
    try {
        const response = await fetch(`/api/medidas/clientes`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medidas)
        })
        const data = await response.json()
        if(!response.ok){
            throw new Error(data.erro)
        }
        console.log(data,'\n',data.msg,'\n',response.ok)
        window.location.href = `/clientes/medidas/listar/${clienteId}?msg=${data.msg}`
    } catch (error) {
        console.log(error)
        window.location.href = `/api/medidas/clientes?error=${error}`
    }
}

setTimeout(() =>{
    const msg = document.getElementById('msg')
    msg.classList.add("fade")
    msg.classList.remove("show")
    window.history.replaceState({}, document.title, window.location.pathname)
}, 5000)

setTimeout(() =>{
    const diverro = document.getElementById('errordiv')
    diverro.classList.add("fade")
    diverro.classList.remove("show")
    window.history.replaceState({}, document.title, window.location.pathname)
}, 5000)