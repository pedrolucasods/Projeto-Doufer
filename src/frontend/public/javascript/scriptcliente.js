const buttonaddcliente = document.getElementById('newcliente');
const buttonback = document.getElementById('back');

let idClienteParaExcluir = null; // 🟡 usado para guardar o ID temporariamente

document.addEventListener('DOMContentLoaded', function () {
  const select = document.getElementById('fieldsearch');
  const input = document.getElementById('inputsearch');
  console.log('dom carregado');

  select.addEventListener('change', function () {
    let selectvalue = select.options[select.selectedIndex].text.toLowerCase();
    input.placeholder = `digite o ${selectvalue}...`;
  });

  // ✅ AQUI: Corrige o input travado no Electron após carregamento
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


