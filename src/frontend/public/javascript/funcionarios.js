function voltar(){
    const cliente_id = sessionStorage.getItem('clienteId')
    window.location.href = `/clientes/detalhes/${cliente_id}`
}

function aplicarFiltroFuncionarios() {
    const input = document.getElementById('search-funcionario')
    const cards = Array.from(document.querySelectorAll('.card-funcionario'))
    const grid = document.getElementById('grid-funcionarios')
    const emptyState = document.getElementById('empty-state-search')

    if (!input || !grid || !emptyState) return

    const termo = input.value.trim().toLowerCase()
    let encontrados = 0

    cards.forEach((card) => {
        const nome = (card.dataset.nome || '').toLowerCase()
        const id = (card.dataset.id || '').toLowerCase()
        const corresponde = !termo || nome.includes(termo) || id.includes(termo)

        card.style.display = corresponde ? '' : 'none'
        if (corresponde) encontrados++
    })

    grid.style.display = encontrados > 0 ? 'grid' : 'none'
    emptyState.style.display = encontrados > 0 ? 'none' : 'flex'
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

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('search-funcionario')
    if (input) {
        input.addEventListener('input', aplicarFiltroFuncionarios)
    }
})

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