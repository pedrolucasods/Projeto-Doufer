function cadastrar(item_id){
    window.location.href = `/medidas/itens-pedidos/${item_id}/cadastro/SobMedida/masculina`
}

function atualizar(medida_id){
window.location.href = `/medidas/itens-pedidos/${medida_id}/atualizar/SobMedida`
}

function voltar(item_id){
    window.location.href = `/itens-pedidos/detalhes/${item_id}`
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