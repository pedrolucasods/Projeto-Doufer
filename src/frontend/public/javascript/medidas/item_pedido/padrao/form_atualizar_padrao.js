document.addEventListener('DOMContentLoaded',()=>{
    const form = document.getElementById('formAddMedidaPadraoItemPedido')
    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        const url = window.location.pathname
        const parametros = url.split('/')
        const medida_id = parametros[3]
        e.preventDefault()
        let dados = {
            item_pedido_medida_id:document.getElementById('vinculo_id').value,
            medida_id:medida_id,
            quantidade:document.getElementById('quantidade').value,
            tipo_medida:"padrao",
            medidas:[{
                sexo:document.getElementById('sexo').value,
                tamanho:document.getElementById('tamanho').value,
                ajuste:document.getElementById('ajuste').value
            }]
        }
        atualizar_medidas(dados)
    })
})

async function atualizar_medidas(dados){
    try {
        const item_id = sessionStorage.getItem("item_id")
        if(dados.quantidade<0){
            throw new Error('Quantidade Inválido ou Superior a Disponivel!')
        }
        if(dados.medidas[0].tamanho == '' && dados.medidas[0].ajustes == ''){
            throw new Error('Nenhuma Medida Informada!')
        }
        
        const response = await fetch(`/medidas/itens-pedidos`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(dados)
        })

        const data = await response.json()
        if(!response.ok){
            throw new Error(data.erro)
        }

        window.location.href = `/medidas/itens-pedidos/${item_id}/padrao?msg=${data.msg}`
    } catch (error) {
        window.location.href = `/medidas/itens-pedidos/${dados.medidas_id}/atualizar/padrao?error=${error}`
    }
}

function voltar(id){
    window.location.href = `/medidas/itens-pedidos/${id}/padrao`
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