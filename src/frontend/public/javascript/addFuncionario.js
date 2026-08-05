document.addEventListener("DOMContentLoaded",async function(){
    mascara()
    const form = document.getElementById("form-cadastro")
    form.addEventListener("submit",(e)=>{
        e.preventDefault()
        const cliente_id = sessionStorage.getItem("clienteId")
        const dados = {
            cliente_id:cliente_id,
            nome:document.getElementById("nome").value,
            telefone:document.getElementById("telefone").value
        }
        cadastrarFuncionario(dados)
    })
    
})

async function cadastrarFuncionario(dados){
    try {
        const response = await fetch(`/funcionarios`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
        const data = await response.json()
        if(!response.ok){
            throw new Error(data.erro)
        }
        window.location.href = `/funcionarios/empresa/${dados.cliente_id}?msg=${data.msg}`
    } catch (error) {
        window.location.href = `/funcionarios/cadastro?error=${error}`
    }
}

function voltar(){
    const cliente_id = sessionStorage.getItem("clienteId")
    window.location.href = `/funcionarios/empresa/${cliente_id}`
}

function mascara() {

    //Mascara campo nome

    const inputname = document.getElementById('nome')
    inputname.addEventListener('input', function () {
        // Remove tudo que não for letra ou espaço
        this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');

        // Substitui múltiplos espaços por apenas um
        this.value = this.value.replace(/\s{2,}/g, ' ');

        // Remove espaço no início
        this.value = this.value.replace(/^\s+/, '');

    })

    inputname.addEventListener('blur', function () {
        this.value = this.value.replace(/\s+$/, ''); // remove espaços no final
    });

    //Mascara campo telefone

    const telefoneinput = document.getElementById('telefone')
    if (telefoneinput) {
        IMask(telefoneinput, {
            mask: '(00) 00000-0000'
        })
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