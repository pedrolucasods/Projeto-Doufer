function voltar(id){
    window.location.href = `/clientes/detalhes/${id}`
}

function atualizarMedidasSobMedidaFeminina(id){
    let medida_id = sessionStorage.setItem('medida_id_sob_feminina',id)
    window.location.href = `/medidas/clientes/${id}/sob/feminina`
}

function atualizarMedidasSobMedidaMasculina(id){
    let medida_id = sessionStorage.setItem('medida_id_sob_masculina',id)
    window.location.href = `/medidas/clientes/${id}/sob/masculina`
}

function atualizarMedidasPadrao(medidaId){
    let medida_id = sessionStorage.setItem('medida_id_padrao',medidaId)
    window.location.href = `/medidas/clientes/${medidaId}/padrao`
}

function cadastrarMedidasSobMedidaFeminina(id){
    let clientId = sessionStorage.setItem('clienteId',id)
    window.location.href = `/medidas/clientes/sob/feminina`
}

function cadastrarMedidasSobMedidaMasculina(id){
    let clientId = sessionStorage.setItem('clienteId',id)
    window.location.href = `/medidas/clientes/sob/masculina`
}

function cadastrarMedidasPadrao(id){
    let clientId = sessionStorage.setItem('clienteId',id)
    window.location.href = `/medidas/clientes/padrao`
}

function abrirModalSobMedidaFeminina(id){
    const clienteId = sessionStorage.setItem('clienteId',id)
    const modalElement = document.getElementById("meumodal")
    const modal = new bootstrap.Modal(modalElement)

    modal.show()
}

function abrirModalSobMedidaMasculina(id){
    const clienteId = sessionStorage.setItem('clienteId',id)
    const modalElement = document.getElementById("meumodalmasculino")
    const modal = new bootstrap.Modal(modalElement)

    modal.show()
}

function abrirModalpadrao(){
    const modalElement = document.getElementById("meumodalpadrao")
    const modal = new bootstrap.Modal(modalElement)

    modal.show()
}

async function deletarMedidaSobMedidaFeminina(medida_id){
     try {
        const clienteid = sessionStorage.getItem('clienteId')
        const dados = {tipo_medida:"sob_medida",medida_id:medida_id,cliente_id:clienteid,medidas:[{sexo:"feminino"}]}
        const response = await fetch(`/medidas/clientes`,{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(dados)
        })
        const data = await response.json()
        if(!response.ok){
            throw new Error(data.erro)
        }
        window.location.href = `/medidas/clientes/listar/${clienteid}?msg=${data.msg}`
     } catch (error) {
        const clienteid = sessionStorage.getItem('clienteId')
        const erro = error
        window.location.href= `/medidas/clientes/listar/${clienteid}?error=${erro}`
     }
}

async function deletarMedidaSobMedidaMasculina(medida_id){
     try {
        const clienteid = sessionStorage.getItem('clienteId')
        const dados = {tipo_medida:"sob_medida",medida_id:medida_id,cliente_id:clienteid,medidas:[{sexo:"masculino"}]}
        const response = await fetch(`/medidas/clientes`,{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(dados)
        })
        const data = await response.json()
        if(!response.ok){
            throw new Error(data.erro)
        }
        window.location.href = `/medidas/clientes/listar/${clienteid}?msg=${data.msg}`
     } catch (error) {
        const clienteid = sessionStorage.getItem('clienteId')
        const erro = error
        window.location.href= `/medidas/clientes/listar/${clienteid}?error=${erro}`
     }
}

async function deletarMedidaPadrao(medidaId) {
    try {
        const clienteid = sessionStorage.getItem('clienteId')
        const dados = {tipo_medida:"padrao",medida_id:medidaId,cliente_id:clienteid}
        const response = await fetch(`/medidas/clientes`,{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(dados)
        })
        const data = await response.json()
        if(!response.ok){
            throw new Error(data.erro)
        }
        window.location.href = `/medidas/clientes/listar/${clienteid}?msg=${data.msg}`
     } catch (error) {
        const erro = error
        window.location.href= `/medidas/clientes/listar/${clienteid}?error=${erro}`
     }
}

function alternarTipoSobMedida(tipo) {
    const tag = document.getElementById('tagTipoSobMedida');
    const femSection = document.getElementById('sob-medida-feminina');
    const mascSection = document.getElementById('sob-medida-masculina');
    const infoFem = document.getElementById('info-feminina');
    const infoMasc = document.getElementById('info-masculina');
    const actionsFem = document.getElementById('actions-feminina');
    const actionsMasc = document.getElementById('actions-masculina');
    const adicionaButtons = document.querySelectorAll('.btn-adicionar-sob-medida');
    const clienteId = sessionStorage.getItem('clienteId');

    if (tag) {
        tag.textContent = tipo === 'feminina' ? 'Feminina' : 'Masculina';
    }

    if (femSection && mascSection) {
        femSection.style.display = tipo === 'feminina' ? 'block' : 'none';
        mascSection.style.display = tipo === 'masculina' ? 'block' : 'none';
    }

    if (infoFem && infoMasc) {
        infoFem.style.display = tipo === 'feminina' ? 'flex' : 'none';
        infoMasc.style.display = tipo === 'masculina' ? 'flex' : 'none';
    }

    if (actionsFem && actionsMasc) {
        actionsFem.style.display = tipo === 'feminina' ? 'flex' : 'none';
        actionsMasc.style.display = tipo === 'masculina' ? 'flex' : 'none';
    }

    adicionaButtons.forEach((btnAdicionar) => {
        if (tipo === 'feminina') {
            btnAdicionar.setAttribute('onclick', `cadastrarMedidasSobMedidaFeminina(${clienteId})`);
            btnAdicionar.innerHTML = '<i class="fas fa-plus"></i> Adicionar Feminina';
        } else {
            btnAdicionar.setAttribute('onclick', `cadastrarMedidasSobMedidaMasculina(${clienteId})`);
            btnAdicionar.innerHTML = '<i class="fas fa-plus"></i> Adicionar Masculina';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('selectTipoSobMedida');
    if (select) {
        alternarTipoSobMedida(select.value);
    }
});

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