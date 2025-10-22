document.addEventListener('DOMContentLoaded',function(){
    mascara()

    const form = document.getElementById('formeditcliente')
    const spanname = document.getElementById('spanname')
    const spannphone = document.getElementById('spanphone')
    const spancpf = document.getElementById('spancpf')

    form.addEventListener('submit',function(event){
    let inputname = document.getElementById('inputnome').value
    let inputphone = document.getElementById('telefone').value
    
    if(!validatename(inputname)){
        spanname.innerHTML = 'Erro, nome inválido!'
        event.preventDefault()
        }
    
    if(!validatephone(inputphone)){
            spannphone.innerHTML = 'Erro, numero de telefone Inválido!'
            event.preventDefault()
        }
    

    
    if(!validaCPF(inputcpf)){
        spancpf.innerHTML = 'Erro, cpf Inválido!'
        event.preventDefault
    }
        
    })

    // verificação do se quer inserir cpf
    const checkbox = document.getElementById('toggleCpf');
    const cpfContainer = document.getElementById('cpfContainer');
    if (!checkbox || !cpfContainer) {
      console.warn('Elementos não encontrados no DOM');
      return;
    }
    cpfContainer.style.display = checkbox.checked ? 'block' : 'none';

    checkbox.addEventListener('change', function () {
      cpfContainer.style.display = this.checked ? 'block' : 'none';
      cpfinput.required = checked
    });

})

// Validações


    //validação nome
function validatename(input){
    if(input.trim() === '' || input.length <3){
        return false
    }
    return true
}

    //validação telefone
function validatephone(input){
    if(input.length < 15){
        return false
    }
    return true
}

    //validacao cpf
function validaCPF(input) {
  if (input === null || input === undefined) return false;

  // transformar em string e limpar tudo que não é dígito
  const cpf = String(input).replace(/\D/g, '');

  // precisa ter 11 dígitos
  if (cpf.length !== 11) return false;

  // rejeita CPF com todos os dígitos iguais (ex: 00000000000, 11111111111, ...)
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  // converte para array de inteiros
  const nums = cpf.split('').map(d => parseInt(d, 10));

  // calcula dígito verificador 1
  let soma1 = 0;

  for (let i = 0; i < 9; i++) {
    // peso decrescente de 10 a 2
    soma1 += nums[i] * (10 - i);
  }
  const resto1 = soma1 % 11;
  const digito1 = (resto1 < 2) ? 0 : 11 - resto1;
  if (digito1 !== nums[9]) return false;

  // calcula dígito verificador 2
  let soma2 = 0;
  for (let i = 0; i < 10; i++) {
    // peso decrescente de 11 a 2 (inclui o primeiro dígito verificador)
    soma2 += nums[i] * (11 - i);
  }
  const resto2 = soma2 % 11;
  const digito2 = (resto2 < 2) ? 0 : 11 - resto2;
  if (digito2 !== nums[10]) return false;
  return true;
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

    const cpfinput = document.getElementById('cpfInput')
    if(cpfinput){
        IMask(cpfinput,{
            mask:'000.000.000-00'
        })
    }
}