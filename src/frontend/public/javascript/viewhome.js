const btncliente = document.getElementById('btncliente')


btncliente.addEventListener('click',function(){
    window.location.href = '/clientes'
})

const { remote } = require('electron');
const win = remote.getCurrentWindow();

setTimeout(() => {
    win.blur();
    win.focus();
}, 100);