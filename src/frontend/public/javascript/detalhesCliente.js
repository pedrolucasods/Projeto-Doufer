const btnback = document.getElementById('back')
btnback.addEventListener('click', function(){
    window.location.href = '/clientes/'
})

function pedidosCliente(id){
    window.location.href = `/pedidos/PedidosCliente/${id}`
}