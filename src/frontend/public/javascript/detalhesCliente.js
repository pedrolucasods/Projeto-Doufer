const btnback = document.getElementById('back')
btnback.addEventListener('click', function(){
    window.location.href = '/clientes/'
})

function pedidosCliente(id){
    window.location.href = `/pedidos/PedidosCliente/${id}`
}


function listarMedidas(id){
    let cliente_id = sessionStorage.setItem('clienteId',id)
    window.location.href = `/medidas/clientes/listar/${id}`
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

