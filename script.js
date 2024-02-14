const toDoList = {

    init: function(){

        // RECUPERER LES INFOS STOCKEES
        toDoList.getDataFromLocalStorage()

        // AJOUTER UN ELEMENT A LA LISTE
        const form = document.querySelector('.input-add-container')
        form.addEventListener('submit', toDoList.addToList)

        // CHECKER UN ELEMENT DE LA LISTE
        const allLiElements = document.querySelectorAll('.list-item')
        for (let liElement of allLiElements) {
            liElement.addEventListener('click', toDoList.checkAction);
          }

        // ENLEVER UN ELEMENT DE LA LISTE
        const allCloseButton = document.querySelectorAll('.delete-button')
        for (let closeButton of allCloseButton){
            closeButton.addEventListener('click', toDoList.removeAction)
        }
    },

    addToList: function (event){
        event.preventDefault()

        const inputElement = document.getElementById('input-add')
        const inputContent = inputElement.value

        if (inputContent.trim() === ""){

            alert('Veuillez écrire quelque chose pour valider')

        } else{

            //Je créé un nouvel élément Li qu aura un écouteur check
            const listContainer = document.querySelector('.list-content')
            const liElement = document.createElement('li');
            liElement.textContent = inputContent
            liElement.classList.add('list-item')
            listContainer.prepend(liElement);
            liElement.addEventListener('click', toDoList.checkAction);
            
            //avec un bouton suppr qui aura un écouteur
            const deleteButton = document.createElement('span');
            deleteButton.classList.add('delete-button')
            liElement.appendChild(deleteButton);
            deleteButton.addEventListener('click', toDoList.removeAction)

            //Je stocke les données dans le navigateur
            toDoList.saveToLocalStorage()

            inputElement.value = ""
        }

    },

    checkAction: function(event){
        const liElementClicked = event.target;
        liElementClicked.classList.toggle('checked')
        toDoList.saveToLocalStorage()
    },

    removeAction: function(event){
        const closeButtonClicked = event.currentTarget;
        liElementToRemove = closeButtonClicked.closest('li')
        liElementToRemove.remove()
        toDoList.saveToLocalStorage()
    },

    saveToLocalStorage: function(){
        const listContainer = document.querySelector('.list-content')
        // On sauvegarde la data dans le localStorage
        localStorage.setItem('data', listContainer.innerHTML);
    },

    getDataFromLocalStorage: function(){
        // On sauvegarde la data dans le localStorage
        const listContainer = document.querySelector('.list-content')
        listContainer.innerHTML = localStorage.getItem('data')

    }

}

document.addEventListener('DOMContentLoaded', toDoList.init)