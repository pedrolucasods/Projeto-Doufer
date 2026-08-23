document.addEventListener('DOMContentLoaded',()=>{
    const form = document.getElementById('formAddMedidaSobMedidaItemPedido')
    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        const url = window.location.pathname
        const parametros = url.split('/')
        const item_id = parametros[3]
        e.preventDefault()
        let dados = {
            item_pedido_id:item_id,
            quantidade:document.getElementById('quantidade').value,
            tipo_medida:"sob_medida",
            medidas:[{
                sexo:document.getElementById('sexo').value,
                busto:document.getElementById('busto').value,
                cintura:document.getElementById('cintura').value,
                quadril:document.getElementById('quadril').value,
                comprimento:document.getElementById('comprimento').value,
                ombro:document.getElementById('ombro').value,
                costas:document.getElementById('costas').value,
                comprimento_da_manga:document.getElementById('comprimento_da_manga').value,
                largura_da_manga:document.getElementById('largura_da_manga').value
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
        let qtd_sem = 0
        for(let valor of Object.values(dados.medidas[0])){
            if(valor == ''){
                qtd_sem +=1
            }
        }
        if(qtd_sem == 8){
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

        window.location.href = `/pedidos?msg=${data.msg}`
    } catch (error) {
        window.location.href = `/medidas/itens-pedidos/${dados.item_pedido_id}/cadastro/SobMedida?error=${error}`
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