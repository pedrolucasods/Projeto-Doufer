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

function abrirModalExcluir(id = null, nome = ''){
    const modalElement = document.getElementById('modalExcluirFuncionario')
    const nomeElement = document.getElementById('modal-nome-funcionario')
    const funcionario_id = sessionStorage.setItem("funcionarioId",id)

    if (nomeElement && nome) {
        nomeElement.textContent = nome
    }

    if (modalElement) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalElement)
        modal.show()
    }
}

async function confirmarExclusao(){
    try {
        const funcionario_id = sessionStorage.getItem("funcionarioId")
        const cliente_id = sessionStorage.getItem("clienteId")
        const response = await fetch(`/funcionarios/${funcionario_id}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.erro)
        }
        sessionStorage.removeItem('funcionarioId')
        window.location.href = `/funcionarios/empresa/${cliente_id}?msg=${data.msg}`
    } catch (error) {
        const cliente_id = sessionStorage.getItem("clienteId")
        window.location.href = `/funcionarios/empresa/${cliente_id}?error=${error.msg}`
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