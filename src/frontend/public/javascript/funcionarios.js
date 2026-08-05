function voltar(){
    const cliente_id = sessionStorage.getItem('clienteId')
    window.location.href = `/clientes/detalhes/${cliente_id}`
}

function cadastrarFuncionario(){
    window.location.href = `/funcionarios/cadastro`
}

function editarFuncionario(id){
    const funcionario_id = sessionStorage.setItem("funcionarioId",id)
    window.location.href = `/funcionarios/atualizar/${id}`
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