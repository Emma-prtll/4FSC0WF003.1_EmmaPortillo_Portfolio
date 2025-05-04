// LOGO
const path = document.querySelector("#logo path");
let isBlue = true;

setInterval(changeColor, 3000)

function changeColor(){
    path.setAttribute("fill", isBlue ? "#F7B0BE" : "#B0BDF7");
    isBlue = !isBlue;
}

// CONTACT FORM
// Récupération des éléments
const form = document.querySelector("form")
const inputEmail = document.querySelector("#email")
const inputPhone = document.querySelector("#tel")
const inputLname = document.querySelector("#lname")
const inputFname = document.querySelector("#fname")
const inputSubject = document.querySelector("#subject")
const inputMessage = document.querySelector("#message")
const sendedCard = document.querySelector("#sendedCard")

// RegEx
const checkEmail = /^[a-z0-9][a-z0-9._-]+@[a-z0-9][a-z0-9._-]+\.[a-z]{2,7}$/i
const checkPhone = /^[+0][1-9]{2}\s?[0-9]{2,3}\s?[0-9]{2,3}\s?[0-9]{1,2}/
const checkLname = /^[A-Z][a-zA-Z '.-]*[A-Za-z][^-]$/
const checkFname = /^[A-Z][a-zA-Z '.-]*[A-Za-z][^-]$/
const checkSubject = /\w/
const checkMessage = /\w/

// Fonction de vérification
function checkInput(exp, input) {
    const value = input.value.trim()

    if (exp.test(value)) {
        input.style.border = "2px solid green"
        return true
    } else if (value === "") {
        input.style.border = "none"
        return false
    } else {
        input.style.border = "2px solid red"
        return false
    }
}

// Validation en temps réel
if(document.getElementById(`submit`) !== null){
inputEmail.addEventListener("input", () => checkInput(checkEmail, inputEmail))
inputPhone.addEventListener("input", () => checkInput(checkPhone, inputPhone))
inputLname.addEventListener("input", () => checkInput(checkLname, inputLname))
inputFname.addEventListener("input", () => checkInput(checkFname, inputFname))
inputSubject.addEventListener("input", () => checkInput(checkSubject, inputSubject))
inputMessage.addEventListener("input", () => checkInput(checkMessage, inputMessage))

// Validation au clic sur le bouton "Submit"
form.addEventListener("submit", function (event) {
    event.preventDefault() // Empêche le rechargement de la page

    const emailIsOk = checkInput(checkEmail, inputEmail)
    const lnameIsOk = checkInput(checkLname, inputLname)
    const fnameIsOk = checkInput(checkFname, inputFname)
    const subjectIsOk = checkInput(checkSubject, inputSubject)
    const messageIsOk = checkInput(checkMessage, inputMessage)

    if (emailIsOk && lnameIsOk && fnameIsOk && subjectIsOk && messageIsOk) {
        // Affiche le message de confirmation
        sendedCard.style.display = "flex"
        form.style.display = "none"

            // Construire l'email
            const corps = `Firstname: ${inputFname.value}\nLastname: ${inputLname.value}\nEmail: ${inputEmail.value}\nPhone: ${inputPhone.value}\n\n${inputMessage.value}`

            //URL mailto, pour m'envoyerle mail avec l'objet et le message
            const mailtoUrl = `mailto:emma.portillo03@gmail.com?subject=${encodeURIComponent(inputSubject.value)}&body=${encodeURIComponent(corps)}`

            // Ouvrir l'application de mail
            window.location.href = mailtoUrl

    } else {
        // Message d'erreur en cas de formulaire mal remplis
        alert("Please fill in all fields correctly!")
    }
})
}

//PROJET
//PROJET - PAGE SWITCH
let sliderButton = document.getElementById(`button-slider`)
let galleryButton = document.getElementById(`gayllery-slider`)
let pageSelected = document.getElementById(`selected-page`)

let slider = document.getElementById(`slider-container`)
let gallery = document.getElementById(`gallery-container`)

let sliderOn = true

const mobileSize = 425

function changePage(index){
    let screenSize = screen.width

    if(screenSize > mobileSize){
        changePageDesktop(index)
    } else {
        changePageMobile(index)
    }
}

function changePageMobile(index){
    if(index === 1){
        pageSelected.style.left = "70%"

        slider.classList.add("hidden")
        gallery.classList.remove("hidden")

        sliderOn = !sliderOn

    } else if (index === 0) {
        pageSelected.style.left = "0"

        slider.classList.remove("hidden")
        gallery.classList.add("hidden")

        sliderOn = !sliderOn
    }
}

function changePageDesktop(index){
    if(index === 1){
        pageSelected.style.bottom = "0"

        slider.classList.add("hidden")
        gallery.classList.remove("hidden")

    } else if(index === 0){
        pageSelected.style.bottom = "70%"

        slider.classList.remove("hidden")
        gallery.classList.add("hidden")

    }
}

//PROJECT - SLIDER
const slides = document.querySelectorAll(".slide")
let slideIndex = 0
let intervalId = null

//initializeSlider()
document.addEventListener("DOMContentLoaded", initializeSlider)


function initializeSlider(){
    //Permet de lancer le démarrage du slider et de mettrel'interval de 5 seconde
    if(slides.length > 0){
    slides[slideIndex].classList.add("displaySlide")
    intervalId = setInterval(nextSlide, 5000)
    }
    //Permet de ne pas créer d'erreur dans la console si on se trouve sur une autre page
    if(document.getElementById(`play`) !== null){
    document.getElementById("play").classList.add("notActive")
    }
}

function showSlide(index){
    //Remet à 0 l'index si il dépasse le nombre d'image afin de créer une boucle
    if(index >= slides.length){
        slideIndex = 0
    } else if (index < 0){
        slideIndex = slides.length - 1
    }

    slides.forEach(slide => {
        slide.classList.remove("displaySlide")
    })
    //Permet d'afficher l'image correspondant à l'index
    slides[slideIndex].classList.add("displaySlide")
}

function prevSlide(){
    //Permet de mettre le slider en pause lors du clique sur précédent
    clearInterval(intervalId)
    //Change le signe du pause en play (pour remettre sur play)
    document.getElementById("stop").textContent= ">"

    //Affiche l'image précédente
    slideIndex--
    showSlide(slideIndex)
}

function nextSlide(){
    //Affiche l'image suivante
    slideIndex++
    showSlide(slideIndex)
}

//Pause
if(document.getElementById(`stop`) !== null){
let isPaused = false
document.getElementById(`stop`).addEventListener("click", toPause)

function toPause(){
    if(isPaused){
        //Si c'est en pause, on relance le défilement
        intervalId = setInterval(nextSlide, 5000)
         document.getElementById("stop").textContent = "||"
    } else {
        //Si ce n'est pas en pause, on arrête le défilement
        clearInterval(intervalId)
         document.getElementById("stop").textContent= ">"
    }
    isPaused = !isPaused //Inverse l'état
}
}

//PROJECT - GALLERY
let aurea = document.getElementById(`aurea`)
let quarix = document.getElementById(`quarix`)
let taiso = document.getElementById(`taiso`)
let gig = document.getElementById(`gig`)

let imgAurea = document.getElementById(`img-aurea`)
let imgQuarix = document.getElementById(`img-quarix`)
let imgTaiso = document.getElementById(`img-taiso`)
let imgGig = document.getElementById(`img-gig`)

let behance = document.getElementById(`behance-path`)

if(document.getElementById(`gallery`) !== null){

imgAurea.addEventListener(`mouseenter`, function(){
    hoverIn(aurea)
})
imgAurea.addEventListener(`mouseleave`, function(){
    hoverOut(aurea)
})

imgQuarix.addEventListener(`mouseenter`, function(){
    hoverIn(quarix)
})
imgQuarix.addEventListener(`mouseleave`, function(){
    hoverOut(quarix)
})

imgTaiso.addEventListener(`mouseenter`, function(){
    hoverIn(taiso)
})
imgTaiso.addEventListener(`mouseleave`, function(){
    hoverOut(taiso)
})

imgGig.addEventListener(`mouseenter`, function(){
    hoverIn(gig)
})
imgGig.addEventListener(`mouseleave`, function(){
    hoverOut(gig)
})

// Quand la souris entre dans l'image
function hoverIn (id){
    id.classList.remove("hidden")
    behance.classList.add("hidden")
}

// Quand la souris sors de l'image
function hoverOut (id){
    id.classList.add("hidden")
    behance.classList.remove("hidden")
}
}

