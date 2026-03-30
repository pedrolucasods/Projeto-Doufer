const newpedidobtn = document.getElementById('newpedido')
let idDeletarPedido = null
let idEditarPedido = null
newpedidobtn.addEventListener('click', function(){
    window.location.href = '/pedidos/cadastrarPedido'
})

function deletarPedido(id){
    idDeletarPedido = id
    document.getElementById('modalConfirm').style.display = 'flex'
}

async function confirmarExclusao(){
    try {
        document.getElementById('modalConfirm').style.display = 'none'
        const response = await fetch(`/api/pedidos/${idDeletarPedido}`,{
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data = await response.json()
        if(!response.ok){
            throw new Error(data.erro)
        }
        window.location.href = `/pedidos?msg=${data.msg}`
    } catch (error) {
        console.log(error)
        window.location.href = `/pedidos?error=${error}`
    }
    
}


function fecharModal(){
    document.getElementById('modalConfirm').style.display = 'none'
}

async function editarPedido(id){
    let idEditarPedido = await id
    window.location.href = `/pedidos/editar/${idEditarPedido}`
    
}


function detalhesPedido(id){
    let idDetalhesPedido = id
    window.location.href = `/pedidos/detalhes/${idDetalhesPedido}`
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