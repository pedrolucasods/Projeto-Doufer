document.addEventListener('DOMContentLoaded',()=>{
    const form = document.getElementById('formAddMedidaPadraoItemPedido')
    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        const url = window.location.pathname
        const parametros = url.split('/')
        const item_id = parametros[3]
        e.preventDefault()
        let dados = {
            item_pedido_id:item_id,
            quantidade:document.getElementById('quantidade').value,
            tipo_medida:"padrao",
            medidas:[{
                tamanho:document.getElementById('tamanho').value,
                ajuste:document.getElementById('ajuste').value
            }]
        }
        adicionarMedidas(dados)
    })
})

async function adicionarMedidas(dados){
    try {
        if(dados.quantidade<0){
            throw new Error('Quantidade Inválido ou Superior a Disponivel!')
        }
        if(dados.medidas[0].tamanho == '' && dados.medidas[0].ajustes == ''){
            throw new Error('Nenhuma Medida Informada!')
        }
        
        const response = await fetch(`/medidas/itens-pedidos`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(dados)
        })

        const data = await response.json()
        if(!response.ok){
            throw new Error(data.erro)
        }

        window.location.href = `/pedidos/msg=${data.msg}`
    } catch (error) {
        window.location.href = `/medidas/itens-pedidos/${dados.item_pedido_id}/padrao?error=${error}`
    }
}

function voltar(id){
    window.location.href = `/pedidos/detalhes/${id}`
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