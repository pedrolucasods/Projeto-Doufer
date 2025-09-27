document.addEventListener('DOMContentLoaded',function(){
    const telefoneinput = document.getElementById('telefone')
    if(telefoneinput){
        IMask(telefoneinput,{
            mask:'(00) 00000-0000'
        })
    }

    const cpfinput = document.getElementById('cpf')
    if(cpfinput){
        IMask(cpfinput,{
            mask:'000.000.000-00'
        })
    }
})