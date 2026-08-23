document.addEventListener('DOMContentLoaded', () => {
	const campoBusca = document.getElementById('buscar-medida-padrao')
	const filtroSexo = document.getElementById('filtro-sexo-medida')
	const modalAjuste = document.getElementById('modalAjustePadrao')
	const textoAjuste = document.getElementById('textoAjustePadrao')

	campoBusca?.addEventListener('input', aplicarFiltroMedidasPadrao)
	filtroSexo?.addEventListener('change', aplicarFiltroMedidasPadrao)

	modalAjuste?.addEventListener('show.bs.modal', (event) => {
		const botao = event.relatedTarget
		const ajuste = botao?.dataset.ajuste?.trim()

		if (textoAjuste) {
			textoAjuste.textContent = ajuste || 'Nenhum ajuste informado.'
		}
	})
})

function cadastrar(item_id){
    window.location.href = `/medidas/itens-pedidos/${item_id}/cadastro/padrao`
}

function atualizar(medida_id){
    window.location.href = `/medidas/itens-pedidos/${medida_id}/atualizar/padrao`
}

function voltar(item_id){
    window.location.href = `/itens-pedidos/detalhes/${item_id}`
}

function normalizarTexto(valor) {
	return (valor || '')
		.toString()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
}

function aplicarFiltroMedidasPadrao() {
	const campoBusca = document.getElementById('buscar-medida-padrao')
	const filtroSexo = document.getElementById('filtro-sexo-medida')
	const cards = Array.from(document.querySelectorAll('.medida-card'))
	const grid = document.querySelector('.medidas-grid')
	const estadoVazio = document.getElementById('empty-search-state')

	if (!campoBusca || !filtroSexo || !grid || !estadoVazio) return

	const termo = normalizarTexto(campoBusca.value.trim())
	const sexoSelecionado = normalizarTexto(filtroSexo.value)
	let encontrados = 0

	cards.forEach((card) => {
		const tamanho = normalizarTexto(card.dataset.tamanho)
		const ajuste = normalizarTexto(card.dataset.ajuste)
		const sexo = normalizarTexto(card.dataset.sexo)
		const correspondeTexto = !termo || tamanho.includes(termo) || ajuste.includes(termo)
		const correspondeSexo = sexoSelecionado === 'todos' || sexo === sexoSelecionado
		const corresponde = correspondeTexto && correspondeSexo

		card.hidden = !corresponde
		if (corresponde) encontrados++
	})

	grid.hidden = encontrados === 0
	estadoVazio.hidden = encontrados > 0
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