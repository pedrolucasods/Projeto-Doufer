document.addEventListener('DOMContentLoaded',()=>{
    mascaras()
})

function mascaras(){
    let inputBusto = document.getElementById('inputBusto')
    mask(inputBusto)
    
    

    const inputCintura = document.getElementById('inputCintura')
    mask(inputCintura)

    const inputQuadril = document.getElementById('inputQuadril')
    mask(inputQuadril)

    const inputComprimento = document.getElementById('inputComprimento')
    mask(inputComprimento)

    const inputOmbro = document.getElementById('inputOmbro')
    mask(inputOmbro)

    const inputCostas = document.getElementById('inputCostas')
    mask(inputCostas)

    const inputCManga = document.getElementById('inputCManga')
    mask(inputCManga)

    const inputLManga = document.getElementById('inputLManga')
    mask(inputLManga)
}


function mask(input){
    IMask(input,{
        mask:'000cm'
    })

}