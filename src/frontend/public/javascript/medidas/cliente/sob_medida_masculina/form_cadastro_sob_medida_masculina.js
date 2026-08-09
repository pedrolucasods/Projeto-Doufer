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
                    sexo:"masculino",
                    ombro : document.getElementById('inputOmbro').value,
                    circunferencia_torax : document.getElementById('inputCircunferenciaTorax').value,
                    circunferencia_abdomen : document.getElementById('inputCircunferenciaAbdomen').value,
                    costa : document.getElementById('inputCosta').value,
                    comprimento_da_manga : document.getElementById('inputComprimentoManga').value,
                    largura_punho : document.getElementById('inputLarguraPunho').value,
                    largura_da_manga : document.getElementById('inputLarguraManga').value,
                    comprimento_corpo : document.getElementById('inputComprimentoCorpo').value
                }
            ]
            
        }
        
        adicionarMedida(dados,clienteId)
    })
})

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

async function adicionarMedida(medidas,clienteId){
    try {
        const response = await fetch(`/medidas/clientes`,{
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
        window.location.href = `/medidas/clientes/listar/${clienteId}?msg=${data.msg}`
    } catch (error) {
        console.log(error)
        window.location.href = `/medidas/clientes?error=${error}`
    }
}

function voltar(){
    cliente_id = sessionStorage.getItem('clienteId')
    window.location.href = `/medidas/clientes/listar/${cliente_id}`
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