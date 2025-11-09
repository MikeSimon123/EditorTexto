const formEditor = document.getElementById("editor-form")
const editorArea = document.getElementById("editor-area")
const nomeArquivo = document.getElementById("editor-name")
const extensao = document.getElementById("editor-extensao")

formEditor.addEventListener("submit", function(e){
    e.preventDefault()
    //console.log(editorArea.value)
    let conteudo = editorArea.value
    let objArquivo = new Blob([conteudo], {type:"text/plain"})
    let link = document.createElement("a")
    link.href = URL.createObjectURL(objArquivo)
    link.download = `${nomeArquivo.value}.${extensao.value}` || `arquivo.${extensao.value}`
    link.click()

    URL.revokeObjectURL(link.href)
})