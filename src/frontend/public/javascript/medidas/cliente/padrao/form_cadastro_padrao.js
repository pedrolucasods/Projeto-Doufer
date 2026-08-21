document.addEventListener('DOMContentLoaded',()=>{
    const form = document.getElementById('formAddMedidaPadrao')
    const clienteId = sessionStorage.getItem('clienteId')
    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        let dados = {
            tipo_medida:"padrao",
            medidas:[{
                cliente_id:clienteId,
                sexo:document.getElementById('sexo').value,
                tamanho:document.getElementById('tamanho').value,
                ajuste:document.getElementById('ajuste').value
            }]
        }
        adicionarMedida(dados,clienteId)
    })
})

async function adicionarMedida(dados,clienteId){
    try {
        const response = await fetch('/medidas/clientes',{
            method:'POST',
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
        window.location.href = `/medidas/clientes/padrao?error=${error}`
    }
}
function voltar(){
    const clienteId = sessionStorage.getItem('clienteId')
    window.location.href = `/medidas/clientes/listar/${clienteId}`   
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