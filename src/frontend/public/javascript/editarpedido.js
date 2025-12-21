    // mesma logica do criar pedido, por isso o mesmo código. Com algumas alterações !!!!

    document.addEventListener("DOMContentLoaded",async () => {
        const divItens = document.getElementById('itens')
        // =====================================
        // VARIÁVEIS PRINCIPAIS
        // =====================================
        let itens = []          // Array que guarda todos os itens do pedido
        let itensatu = []       // Itens que já existiam
        let novosItens = []     // Apenas itens novos
        let excluirItens = []
        let itensOriginais = []

        let contador = 0        
        let editIndex = null    
        let itemParaExcluir = null 

        console.log('array reiniciado', itens.length)
        carregarItensAtuais()
        // Inicializa contador para não colidir com IDs de itens antigos
        contador = Math.max(0, ...itens.map(i => Number.isInteger(i.id) ? i.id : 0))


        function carregarItensAtuais(){
            itens = []
            itensatu = []
            const itensAtuais = JSON.parse(document.getElementById('itensAntigo').value || "[]")
            itensAtuais.forEach(itensobject =>{
            let objeto = {
                id: itensobject.id,
                id_pedido: itensobject.id_pedido,
                produto: itensobject.produto,
                cor : itensobject.cor,
                tecido : itensobject.tecido,
                tamanho: itensobject.tamanho,
                detalhes: itensobject.detalhes,
                quantidade: itensobject.quantidade,
                modelo: itensobject.modelo_produto,
                precounit: itensobject.preco_unitario,
                complemento: itensobject.complemento,
                total: itensobject.quantidade * itensobject.preco_unitario,
                isNovo: false   // 🔑 flag indicando que veio do banco
            }
            itensOriginais.push(objeto)
            itens.push(objeto)
            itensatu.push(objeto)
        })
            atualizarTabela()
        }
    
        

        const btnAdd = document.getElementById('btn-add-item')
        const form = document.getElementById('formaddpedido')
        const modalConfirm = document.getElementById('modalConfirm')
        const btnConfirmar = document.getElementById('btnConfirmar')
        const btnCancelar = document.getElementById('btnCancelar')

        // =====================================
        // ADICIONAR OU ATUALIZAR ITEM
        // =====================================
        btnAdd.addEventListener('click', function() {
            // Lê os valores dos inputs
            const produto = document.getElementById('nome-produto').value.trim()
            const cor = document.getElementById('cor-produto').value.trim()
            const tecido = document.getElementById('tecido-produto').value.trim()
            const tamanho = document.getElementById('tamanho-produto').value.trim()
            const detalhes = document.getElementById('detalhes-produto').value.trim()
            const quantidade = parseInt(document.getElementById('quantidade-produto').value)
            const modelo = document.getElementById('modelo-produto').value.trim()
            const precounit = parseFloat(document.getElementById('precouni-produto').value)
            const complemento = document.getElementById('complemento-produto').value.trim()

            // Validação básica
            if (!produto || isNaN(quantidade) || quantidade <= 0 || isNaN(precounit)) {
                mostrarAviso()
                return
            }

            
            // Cria objeto item
            const item = {
                id: editIndex !== null ? itens[editIndex].id : ++contador, // mantém id se for edição
                produto,
                cor,
                tecido,
                tamanho,
                detalhes,
                quantidade,
                modelo,
                precounit,
                complemento,
                total: quantidade * precounit,
                isNovo: editIndex !== null ? itens[editIndex].isNovo : true
            }

            // Se estamos editando, substitui o item existente
            if (editIndex !== null) {
                // Atualiza na lista geral
                itens[editIndex] = item

                if (!item.isNovo) {
                    // Atualiza em itensatu por ID
                    const idxAtual = itensatu.findIndex(i => i.id === item.id)
                    if (idxAtual >= 0) itensatu[idxAtual] = item
                } else {
                    // Atualiza em novosItens por ID
                    const idxNovo = novosItens.findIndex(i => i.id === item.id)
                    if (idxNovo >= 0) {
                        novosItens[idxNovo] = item       // substitui o existente
                    } else {
                        novosItens.push(item)            // se por algum motivo não existir, insere
                    }
                }

                editIndex = null
                btnAdd.textContent = "Adicionar Item"
            } else {
                // Caso seja novo item, adiciona no array
                itens.push(item)
                novosItens.push(item)
            }

            atualizarTabela() // Atualiza a visualização da tabela
            limparCampos()    // Limpa os campos para próximo item
        })

        // =====================================
        // ATUALIZAÇÃO DA TABELA DE ITENS
        // =====================================
        function atualizarTabela() {
            // Se não houver itens, mostra mensagem e reseta edição
            if (itens.length === 0) {
                divItens.innerHTML = "<p>Nenhum item adicionado ainda.</p>"
                editIndex = null
                btnAdd.textContent = "Adicionar Item"
                return
            }

            // Monta tabela HTML dinamicamente
            let html = `
                <table class="tabela-itens">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Produto</th>
                            <th>Qtd</th>
                            <th>Preço Unit.</th>
                            <th>Total</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
            `

            let totalGeral = 0
            itens.forEach((item, index) => {
                totalGeral += item.total
                html += `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.produto}</td>
                        <td>${item.quantidade}</td>
                        <td>R$ ${item.precounit.toFixed(2)}</td>
                        <td>R$ ${item.total.toFixed(2)}</td>
                        <td>
                            <button type="button" onclick="editarItem(${index})">Editar</button>
                            <button type="button" onclick="removerItem(${index})">Remover</button>
                        </td>
                    </tr>
                `
            })

            html += `
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="4" style="text-align:right;"><strong>Total Geral:</strong></td>
                            <td colspan="2"><strong>R$ ${totalGeral.toFixed(2)}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            `

            divItens.innerHTML = html
        }

        // =====================================
        // LIMPA OS CAMPOS DO FORMULÁRIO
        // =====================================
        function limparCampos() {
            document.getElementById('nome-produto').value = ''
            document.getElementById('cor-produto').value = ''
            document.getElementById('tecido-produto').value = ''
            document.getElementById('tamanho-produto').value = ''
            document.getElementById('detalhes-produto').value = ''
            document.getElementById('quantidade-produto').value = ''
            document.getElementById('modelo-produto').value = ''
            document.getElementById('precouni-produto').value = ''
            document.getElementById('complemento-produto').value = ''
        }

        // =====================================
        // EDITAR ITEM
        // =====================================
        window.editarItem = function(index) {
            const item = itens[index]
            // Preenche os inputs com os dados do item
            document.getElementById('nome-produto').value = item.produto
            document.getElementById('cor-produto').value = item.cor
            document.getElementById('tecido-produto').value = item.tecido
            document.getElementById('tamanho-produto').value = item.tamanho
            document.getElementById('detalhes-produto').value = item.detalhes
            document.getElementById('quantidade-produto').value = item.quantidade
            document.getElementById('modelo-produto').value = item.modelo
            document.getElementById('precouni-produto').value = item.precounit
            document.getElementById('complemento-produto').value = item.complemento

            // Marca que estamos editando este índice e muda botão
            editIndex = index
            btnAdd.textContent = "Atualizar Item"
        }

        // =====================================
        // REMOVER ITEM (ABRE MODAL)
        // =====================================
        window.removerItem = function(index) {
            itemParaExcluir = index
            modalConfirm.style.display = "flex" // abre o modal
        }

        // =====================================
        // CONFIRMAR EXCLUSÃO DO MODAL
        // =====================================
        btnConfirmar.addEventListener('click', () => {
            if (itemParaExcluir !== null) {
                const itemRemovido = itens[itemParaExcluir]

                itens.splice(itemParaExcluir, 1)

                if (!itemRemovido.isNovo) {
                    excluirItens.push(itemRemovido)
                    itensatu = itensatu.filter(i => i.id !== itemRemovido.id)
                } else {
                    novosItens = novosItens.filter(i => i.id !== itemRemovido.id)
                }

                atualizarTabela()
                limparCampos()
                itemParaExcluir = null
            }
            modalConfirm.style.display = "none" // fecha modal
        })

        // =====================================
        // CANCELAR EXCLUSÃO DO MODAL
        // =====================================
        btnCancelar.addEventListener('click', () => {
            itemParaExcluir = null
            modalConfirm.style.display = "none" // fecha modal
        })


        // Modal aviso
        const modalAviso = document.getElementById('modalAviso')
        const bntok = document.getElementById('btnOK')
        function mostrarAviso(){
            modalAviso.style.display = 'flex'
            bntok.addEventListener('click',function(){
                modalAviso.style.display = 'none'
            })
        }

        // =====================================
        // ENVIO DO FORMULÁRIO
        // =====================================
        form.addEventListener('submit', (e) => {
            

            if (itens.length === 0) {
                alert("Adicione pelo menos um item ao pedido!")
                e.preventDefault()
                return
            }

            // Monta objeto do pedido
            const pedido = {
                clienteId: document.getElementById('selectcliente').value,
                data: document.querySelector('input[type="date"]').value,
                itensatuais: itensatu,
                novoItem:novosItens,
                itens: itens,
                ItensExcluir: excluirItens
            }

            // Pega o input hidden
            const inputHidden = document.getElementById('input-pedido-json')

            // converte o array em String Json e coloca no campo
            inputHidden.value = JSON.stringify(pedido)

            console.log("Pedido final:", pedido)
            console.log(JSON.stringify(pedido.itens, null, 2))
            alert("Pedido salvo com sucesso! Confira o console.")
        })
    })