const buttonaddcliente = document.getElementById('newcliente');
const buttonback = document.getElementById('back');

let idClienteParaExcluir = null; // usado para guardar o ID temporariamente

document.addEventListener('DOMContentLoaded', function () {
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





  //Busca de clientes
  const selectcliente = document.getElementById('fieldsearch');
  const inputsearch = document.getElementById('inputsearch');

  inputsearch.addEventListener('input', filtrarCards);

  function filtrarCards() {
    const campo = selectcliente.value; // nome, id ou telefone
    const termo = inputsearch.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
      let textoComparacao = '';

      if (campo === 'nome') {
        textoComparacao = card.querySelector('.campo-nome').textContent.toLowerCase();
      } else if (campo === 'id') {
        textoComparacao = card.querySelector('.campo-id').textContent.toLowerCase();
      } else if (campo === 'telefone') {
        textoComparacao = card.querySelector('.campo-telefone').textContent.toLowerCase();
      }

      if (textoComparacao.includes(termo)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }


});

buttonaddcliente.addEventListener('click', function () {
  window.location.href = '/clientes/newcliente';
});

buttonback.addEventListener('click', function () {
  window.location.href = '/';
});

// ✅ SUBSTITUIU o confirm() por modal
function deletarCliente(id) {
  idClienteParaExcluir = id;
  document.getElementById('modalConfirm').style.display = 'flex';
}

function confirmarExclusao() {
  document.getElementById('modalConfirm').style.display = 'none';

  fetch(`/clientes/deletar/${idClienteParaExcluir}`, {
    method: 'DELETE'
  })
    .then(response => response.text())
    .then(html => {
      document.body.innerHTML = html;
    })
    .catch(error => {
      console.error('Erro ao deletar cliente:', error);
      alert('Erro ao deletar cliente');
    });

  idClienteParaExcluir = null;
}

function fecharModal() {
  document.getElementById('modalConfirm').style.display = 'none';
  idClienteParaExcluir = null;
}


