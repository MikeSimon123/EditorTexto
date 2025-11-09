const projetos = document.getElementById("projetosArea")
const addProjectButton = document.getElementById("addProjectButton")
const overlay = document.getElementById("overlay")
const formAddProject = document.getElementById("projetoDesc")
const cancelProject = document.getElementById("cancelProject")
const createProject = document.getElementById("createProject")
const projectName = document.getElementById("projectName")

window.addEventListener("DOMContentLoaded", function(){
    if(localStorage.hasOwnProperty("projetos")){
        JSON.parse(localStorage.getItem("projetos")).forEach(elemento => {
            let projeto = document.createElement("div")
            projeto.innerHTML = `
                <p>${elemento.name}</p>
                <img src='img/close.png' class='removeButton' id='removeButton${elemento.name}'>
            `
            projeto.classList.add("projeto")
            projetos.appendChild(projeto)
        })
    } else {
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
    formAddProject.style.top = `${(document.body.offsetHeight - formAddProject.offsetHeight)/2}px`
    formAddProject.style.left = `${(document.body.offsetWidth - formAddProject.offsetWidth)/2}px`
})