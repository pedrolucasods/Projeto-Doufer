document.addEventListener('DOMContentLoaded',()=>{
    const form = document.getElementById('formUpMedidaPadrao')
    const clienteId = sessionStorage.getItem('clienteId')
    const medidaId = sessionStorage.getItem('MedidaId')
    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        let dados = {
            tipo_medida:"padrao",
            medidas:[{
                medidaPadrao_id:medidaId,
                cliente_id:clienteId,
                tamanho:document.getElementById('tamanho').value,
                ajuste:document.getElementById('ajuste').value
            }]
        }
        atualizarMedida(dados,clienteId)
    })
})

async function atualizarMedida(dados,clienteId){
    try {
        const response = await fetch('/api/medidas/clientes',{
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
        window.location.href = `/api/medidas/clientes/listar/${clienteId}?msg=${data.msg}`
    } catch (error) {
        window.location.href = `/api/medidas/clientes/padrao?error=${error}`
    }
}
function voltar(){
    const clienteId = sessionStorage.getItem('clienteId')
    window.location.href = `/api/medidas/clientes/listar/${clienteId}`   
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