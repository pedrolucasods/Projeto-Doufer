function voltar(id){
    window.location.href = `/clientes/detalhes/${id}`
}

function atualizarMedidas(id){
    window.location.href = `/clientes/medidas/editar/${id}`
}

function cadastrarMedidas(id){
    window.location.href = `/clientes/medidas/${id}`
}

function abrirModal(){
    const modalElement = document.getElementById("meumodal")
    const modal = new bootstrap.Modal(modalElement)

    modal.show()
}

async function limparMedidas(id,clienteid){
     try {
        const response = await fetch(`/api/clientes/medidas/${id}`,{
            method:"DELETE"
        })
        const data = await response.json()
        window.location.href = `/clientes/medidas/listar/${clienteid}?msg=${data.msg}`
     } catch (error) {
        const erro = error
        window.location.href= `/clientes/medidas/listar/${clienteid}?error=${erro}`
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