document.addEventListener('DOMContentLoaded',function(){
    mascara()

    const form = document.getElementById('formaddcliente')
    const spanname = document.getElementById('spanname')

    form.addEventListener('submit',function(event){
    let inputname = document.getElementById('inputnome').value 
    if(!validatename(inputname)){
        spanname.innerHTML = 'Erro, nome inválido!'
        event.preventDefault()
        }
    })

})

// Validações

function validatename(input){
    if(input.trim() === '' || input.length <3){
        return false
    }
    return true
}


// Mascaras
function mascara(){

    //Mascara campo nome

    const inputname = document.getElementById('inputnome')
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
    if(telefoneinput){
        IMask(telefoneinput,{
            mask:'(00) 00000-0000'
        })
    }

    //Mascara campo cpf

    const cpfinput = document.getElementById('cpf')
    if(cpfinput){
        IMask(cpfinput,{
            mask:'000.000.000-00'
        })
    }
}