const btncliente = document.getElementById('btncliente')
const btnpedido = document.getElementById('btnpedido')

btncliente.addEventListener('click',function(){
    window.location.href = '/clientes'
})

btnpedido.addEventListener('click',function(){
    window.location.href = '/pedidos'
})



const { remote } = require('electron');
const win = remote.getCurrentWindow();

setTimeout(() => {
    win.blur();
    win.focus();
}, 100);