document.addEventListener('DOMContentLoaded',()=>{
    const select = document.getElementById('fieldsearch');
    const input = document.getElementById('inputsearch');
    console.log('dom carregado');

    select.addEventListener('change', function () {
        let selectvalue = select.options[select.selectedIndex].text.toLowerCase();
        input.placeholder = `digite o ${selectvalue}...`;
    });

    // AQUI: Corrige o input travado no Electron após carregamento
    setTimeout(() => {
        const input = document.getElementById('inputsearch');
        if (input) input.focus();

        try {
            const { remote } = require('electron');
            const win = remote.getCurrentWindow();
            win.blur();
            win.focus();
        } catch (e) {
            console.warn('Electron remote não disponível. Ignorado.');
        }
    }, 300);





    //Busca de pedidos
    const selectPedido = document.getElementById('fieldsearch');
    const inputsearch = document.getElementById('inputsearch');

    inputsearch.addEventListener('input', filtrarCards);

    function filtrarCards() {
        const campo = selectPedido.value;
        const termo = inputsearch.value.trim().toLowerCase();
        const cards = document.querySelectorAll('.pedido-card');

        cards.forEach(card => {
            let textoComparacao = '';

            if (campo === 'cliente') {
                const clienteElement = card.querySelector('.cliente');
                if (clienteElement) {
                    textoComparacao = clienteElement.textContent.toLowerCase();
                }
            } else if (campo === 'id') {
                const idElement = card.querySelector('.pedido-id-badge');
                if (idElement) {
                    textoComparacao = idElement.textContent.toLowerCase();
                }
            } else if (campo === 'data') {
                const infoBoxes = card.querySelectorAll('.info-box');
                for (let box of infoBoxes) {
                    if (box.textContent.includes('Entrega')) {
                        textoComparacao = box.textContent.toLowerCase();
                        break;
                    }
                }
            } else if (campo === 'status') {
                const statusElement = card.querySelector('.status');
                if (statusElement) {
                    textoComparacao = statusElement.textContent.toLowerCase();
                }
            }

            if (textoComparacao.includes(termo)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
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


function abrirModalTipoCliente(){
    const modalElement = document.getElementById("modaltipocliente")
    const modal = new bootstrap.Modal(modalElement)

    modal.show()
}


function detalhesPedido(id){
    let idDetalhesPedido = id
    window.location.href = `/pedidos/detalhes/${idDetalhesPedido}`
}

function selecionarTipoCliente(tipo){
    if (tipo === 'pessoa') {
        console.log('Tipo de cliente selecionado: Padrão')
        window.location.href = '/pedidos/cadastrarPedido?tipo=pessoa'
    } else if (tipo === 'empresa') {
        console.log('Tipo de cliente selecionado: Empresa')
        window.location.href = '/pedidos/cadastrarPedido?tipo=empresa'
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