const cliente = require("../../../backend/services/cliente")

const newpedidobtn = document.getElementById('newpedido')
let idDeletarPedido = null
let idEditarPedido = null

newpedidobtn.addEventListener('click', function(){
    window.location.href = '/pedidos/cadastrarPedido'
})

function fecharAviso(){
    document.getElementById('modalAviso').style.display = 'none'
}

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
        document.getElementById('avisoMensagem').textContent = 'Erro ao deletar cliente';
        document.getElementById('modalAviso').style.display = 'flex';
        });
}


function fecharModal(){
    document.getElementById('modalConfirm').style.display = 'none'
}

async function editarPedido(id){
    let tela = sessionStorage.setItem('tela','pedido_cliente')
    idEditarPedido = await id
    window.location.href = `/pedidos/editar/${idEditarPedido}`
    
}

function detalhesPedido(id){
    window.location.href = `/pedidos/detalhes/${id}`
}

function voltar(){
    const cliente_id = sessionStorage.getItem('clienteId')
    window.location.href = `/clientes/detalhes/${cliente_id}`
}