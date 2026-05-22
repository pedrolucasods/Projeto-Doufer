function voltar(id){
    window.location.href = `/clientes/detalhes/${id}`
}

function atualizarMedidasSobMedida(id){
    let medida_id = sessionStorage.setItem('MedidaId_sobMedida',id)
    window.location.href = `/api/medidas/clientes/${id}/SobMedida`
}

function atualizarMedidasPadrao(medidaId){
    let medida_id = sessionStorage.setItem('MedidaId_padrao',medidaId)
    window.location.href = `/api/medidas/clientes/${medidaId}/padrao`
}

function cadastrarMedidas(id){
    let clientId = sessionStorage.setItem('clienteId',id)
    window.location.href = `/api/medidas/clientes/`
}

function cadastrarMedidasPadrao(id){
    let clientId = sessionStorage.setItem('clienteId',id)
    window.location.href = `/api/medidas/clientes/padrao`
}

function abrirModalSobMedida(id){
    const clienteId = sessionStorage.setItem('clienteId',id)
    const modalElement = document.getElementById("meumodal")
    const modal = new bootstrap.Modal(modalElement)

    modal.show()
}

function abrirModalpadrao(){
    const modalElement = document.getElementById("meumodalpadrao")
    const modal = new bootstrap.Modal(modalElement)

    modal.show()
}

async function deletarMedidaSobMedida(medida_id){
     try {
        const clienteid = sessionStorage.getItem('clienteId')
        const dados = {tipo:"sob_medida",medida_id:medida_id}
        const response = await fetch(`/api/medidas/clientes`,{
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
        window.location.href = `/api/medidas/clientes/listar/${clienteid}?msg=${data.msg}`
     } catch (error) {
        const erro = error
        window.location.href= `/api/medidas/clientes/listar/${clienteid}?error=${erro}`
     }
}

async function deletarMedidaPadrao(medidaId) {
    try {
        const clienteid = sessionStorage.getItem('clienteId')
        const dados = {tipo:"padrao",medida_id:medidaId}
        const response = await fetch(`/api/medidas/clientes`,{
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
        window.location.href = `/api/medidas/clientes/listar/${clienteid}?msg=${data.msg}`
     } catch (error) {
        const erro = error
        window.location.href= `/api/medidas/clientes/listar/${clienteid}?error=${erro}`
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