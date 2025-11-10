const projetos = document.getElementById("projetosArea")
const addProjectButton = document.getElementById("addProjectButton")
const overlay = document.getElementById("overlay")
const formAddProject = document.getElementById("projetoDesc")
const cancelProject = document.getElementById("cancelProject")
const createProject = document.getElementById("createProject")
const projectName = document.getElementById("projectName")
const projectSpace = document.getElementById("projectEditorSpace")
const projectTitle = document.getElementById("projectEditorTitle")
const projectExplorer = document.getElementById("projectEditorStatusArea")
const addFileButton = document.getElementById("addFileButton")
const fileMaker = document.getElementById("fileMaker")
const cancelFile = document.getElementById("cancelFile")
const createFile = document.getElementById("createFile")
const fileName = document.getElementById("fileName")
const fileType = document.getElementById("fileType")
const projectsContainer = document.getElementById("projetos-container")
const backToProjectsArea = document.getElementById("backToProjectsArea")
const fileEditor = document.getElementById("fileEditor")
const cancelEdition = document.getElementById("cancelEdition")
const fileEditorName = document.getElementById("fileEditorName")
const fileContentEditor = document.getElementById("fileContentEditor")
const editButton = document.getElementById("editEdition")
const downloadProject = document.getElementById("downloadProject")
const projectEditorDownload = document.getElementById("projectEditorDownload")

function atualizarProjetos() {
    projetos.innerHTML = ""
    JSON.parse(localStorage.getItem("projetos")).forEach(elemento => {
        
        let projeto = document.createElement("div")
        projeto.innerHTML = `
            <p>${elemento.name}</p>
            <button id='${elemento.name}' class='acessButton'>Acessar</button>
            <img src='img/close.png' class='removeButton' id='removeButton${elemento.name}'>
        `
        projeto.classList.add("projeto")
        projetos.appendChild(projeto)
        let indexA = 0
        document.getElementById(`removeButton${elemento.name}`).addEventListener("click", function(){
            JSON.parse(localStorage.getItem("projetos")).forEach((elementoJSON, index) => {
                if(elementoJSON.name == elemento.name){
                    indexA = index
                }
            })
            let desatualizado = JSON.parse(localStorage.getItem("projetos"))
            desatualizado.splice(indexA, 1)
            localStorage.setItem("projetos", JSON.stringify(desatualizado))
            atualizarProjetos()
            if(JSON.parse(localStorage.getItem("projetos")).length <= 0){
                projetos.style.display = "flex"
            projetos.innerHTML = "<p id='no-projects'>Ainda não existem projetos salvos</p>"
            }
        })
        document.getElementById(`${elemento.name}`).addEventListener("click", function(){
            localStorage.setItem("projeto", elemento.name)
            projectSpace.style.display = "flex"
            projectsContainer.style.display = "none"
            backToProjectsArea.style.display = "flex"
            atualizarProjeto()
        })
    })
}
function atualizarProjeto(){
    if(document.body.offsetWidth > 400){
        downloadProject.style.left = `${(projectEditorDownload.offsetWidth - downloadProject.offsetWidth)/2}px`
    }
    projectTitle.innerHTML = `Projeto em edição: ${localStorage.getItem("projeto")}`
    let arquivos = []
    JSON.parse(localStorage.getItem("projetos")).forEach(elemento => {
        if(elemento.name == localStorage.getItem("projeto")){
            arquivos = elemento.arquivos
        }
    })
    if(arquivos.length == 0){
        projectExplorer.innerHTML = `<p id='no-files'>Nenhum arquivo ou diretório em ${localStorage.getItem("projeto")}</p>`
    } else {
        projectExplorer.innerHTML = ""
        arquivos.forEach(arquivo => {
            let name = ""
            if(arquivo.type == "diretorio"){
                name = `${arquivo.name}`
            } else {
                name = `${arquivo.name}.${arquivo.type}`
            }
            
            let arquivoV = document.createElement("div")
            arquivoV.classList.add("file")
            arquivoV.innerHTML = `
                <div class='fileTitle'><img src='img/${arquivo.type}.png' class='fileTitleImg'><p>${name}</p></div>
                <button class='editFileButton' id='${arquivo.name}edit'>Editar</button>
                <img src='img/close.png' class='removeFileButton' id='${arquivo.name}'>
            `
            projectExplorer.appendChild(arquivoV)
            document.getElementById(`${arquivo.name}`).addEventListener("click", function(){
                let indexA = 0
                JSON.parse(localStorage.getItem("projetos")).forEach(elemento => {
                    if(elemento.name == localStorage.getItem("projeto")){
                        elemento.arquivos.forEach((element, index) => {
                            if(element.name == arquivo.name){
                                indexA = index
                            }
                        })
                    }
                })
                let desatualizado = JSON.parse(localStorage.getItem("projetos"))
                desatualizado.forEach(elemento => {
                    if(elemento.name == localStorage.getItem("projeto")){
                        elemento.arquivos.splice(indexA, 1)
                    }
                })
                localStorage.setItem("projetos", JSON.stringify(desatualizado))
                atualizarProjeto()
            })
            document.getElementById(`${arquivo.name}edit`).addEventListener("click", function(){
                overlay.style.display = "block"
                localStorage.setItem("arquivo", `${arquivo.name}`)
                fileEditor.style.display = "flex"
                fileEditorName.value= `${localStorage.getItem("arquivo")}`
                let conteudo = ""
                
                JSON.parse(localStorage.getItem("projetos")).forEach(elemento => {
                    if(elemento.name == localStorage.getItem("projeto")){
                        elemento.arquivos.forEach(arquivo => {
                            if(arquivo.name == localStorage.getItem("arquivo")){
                                conteudo = arquivo.content
                            }
                        })
                    }
                })
                editor.setValue(conteudo)
                if(document.body.offsetWidth > 400){
                    fileEditor.style.top = `${(document.body.offsetHeight - fileEditor.offsetHeight/2)/2}px`
                    fileEditor.style.left = `${(document.body.offsetWidth - fileEditor.offsetWidth)/2}px`
                }
                editor.setOption("mode", checkChange())
            })
        })
    }
}
addFileButton.addEventListener("click", function(){
    if(localStorage.hasOwnProperty("projeto")){
        overlay.style.display = "block"
        
        fileMaker.style.display = "flex"
        if(document.body.offsetWidth > 400){
            fileMaker.style.top = `${(document.body.offsetHeight - fileMaker.offsetHeight)/2}px`
            fileMaker.style.left = `${(document.body.offsetWidth - fileMaker.offsetWidth)/2}px`
        }
        
    }
})
cancelFile.addEventListener("click", function(){
    overlay.style.display = "none"
    fileMaker.style.display = "none"
})
createFile.addEventListener("click", function(e){
    if(localStorage.hasOwnProperty("projeto")){
        e.preventDefault()
        overlay.style.display = "none"
        fileMaker.style.display = "none"
        let arquivo = {name:fileName.value, type:fileType.value, content:``}
        let desatualizado = JSON.parse(localStorage.getItem("projetos"))
        desatualizado.forEach(elemento => {
            if(elemento.name == localStorage.getItem("projeto")){
                elemento.arquivos.push(arquivo)
            }
        })
        localStorage.setItem("projetos", JSON.stringify(desatualizado))
        atualizarProjeto()
    }
})
window.addEventListener("DOMContentLoaded", function(){
    if(localStorage.hasOwnProperty("projetos") && JSON.parse(localStorage.getItem("projetos")).length > 0){
        projetos.style.display = "grid"
        atualizarProjetos()
    } else {
        projetos.style.display = "flex"
        projetos.innerHTML = "<p id='no-projects'>Ainda não existem projetos salvos</p>"
    }
})

cancelProject.addEventListener("click", function(){
    overlay.style.display = "none"
    formAddProject.style.display = "none"
})

createProject.addEventListener("click", function(){
    if(localStorage.hasOwnProperty("projetos")){
        let projeto = {name:projectName.value, arquivos:[]}
        let statusAtualizado = JSON.parse(localStorage.getItem("projetos"))
        statusAtualizado.push(projeto)
        localStorage.setItem("projetos", JSON.stringify(statusAtualizado))
    }else {
        let projeto = {name:projectName.value, arquivos:[]}
        let statusAtualizado = []
        statusAtualizado.push(projeto)
        localStorage.setItem("projetos", JSON.stringify(statusAtualizado))
    }
})

addProjectButton.addEventListener("click", function(){
    overlay.style.display = "block"
    formAddProject.style.display = "flex"
    if(document.body.offsetWidth > 400){
        formAddProject.style.top = `${(document.body.offsetHeight - formAddProject.offsetHeight)/2}px`
        formAddProject.style.left = `${(document.body.offsetWidth - formAddProject.offsetWidth)/2}px`
    }
    
})

backToProjectsArea.addEventListener("click", function(){
    projectSpace.style.display = "none"
    projectsContainer.style.display = "flex"
    backToProjectsArea.style.display = "none"
})

cancelEdition.addEventListener("click", function(){
    overlay.style.display = "none"
    fileEditor.style.display = "none"
})

editButton.addEventListener("click", function(e){
    if(localStorage.hasOwnProperty("arquivo")){
        e.preventDefault()
        let desatualizado = JSON.parse(localStorage.getItem("projetos"))
        desatualizado.forEach(elemento => {
            if(elemento.name == localStorage.getItem("projeto")){
                elemento.arquivos.forEach(arquivo => {
                    if(arquivo.name == localStorage.getItem("arquivo")){
                        arquivo.content = editor.getValue()
                        
                    }
                })
            }
        })
        localStorage.setItem("projetos", JSON.stringify(desatualizado))
        fileEditor.style.display = "none"
        overlay.style.display = "none"
        atualizarProjeto()
    }
})
