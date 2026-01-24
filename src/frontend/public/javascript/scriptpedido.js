const newpedidobtn = document.getElementById('newpedido')
let idDeletarPedido = null
let idEditarPedido = null
newpedidobtn.addEventListener('click', function(){
    window.location.href = 'pedidos/cadastrarPedido'
})

function deletarPedido(id){
    idDeletarPedido = id
    document.getElementById('modalConfirm').style.display = 'flex'
}

function confirmarExclusao(){
    document.getElementById('modalConfirm').style.display = 'none'
    fetch(`/pedidos/deletar/${idDeletarPedido}`,{
        method: 'DELETE'
    })
        .then(response => response.text())
        .then(html => {
        document.body.innerHTML = html;
        })
        .catch(error => {
        console.error('Erro ao deletar cliente:', error);
        alert('Erro ao deletar cliente');
        });
}


function fecharModal(){
    document.getElementById('modalConfirm').style.display = 'none'
}

async function editarPedido(id){
    idEditarPedido = await id
    window.location.href = `/pedidos/editar/${idEditarPedido}`
    
}
