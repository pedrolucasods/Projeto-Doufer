function voltar(){
    window.location.href = '/pedidos'
}

function detalhes_item(id){
    sessionStorage.setItem("item_id",id)
    window.location.href=`/itens-pedidos/detalhes/${id}`
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