const DOG_URL = "http://localhost:3000/pups"

function loadDogs () {
    
    
    fetch(DOG_URL)
    .then(res => res.json())
    .then(dogs=>{
        dogCard(dogs)
        createFilterListener(dogs)
    })
    
}

function createFilterListener(dogs) {
    const filterButton = document.querySelector("#good-dog-filter")

   filterButton.addEventListener("click", () => changeFilter(dogs, filterButton) )
}

function dogCard (dogs){
    const dogBar = document.querySelector("#dog-bar")
    
    dogs.forEach(dog => {
    const dogSpan = document.createElement("span")
        dogSpan.textContent = `${dog.name}`
        dogSpan.addEventListener("click", () => createDogInfo(dog, dogs))
    
    dogBar.append(dogSpan)
    })
}

function changeFilter (dogs, filterButton) {
    if (filterButton.textContent === "Filter good dogs: OFF") {
        filterButton.textContent = "Filter good dogs: ON";
    } else filterButton.textContent = "Filter good dogs: OFF"

    filterDogs (dogs)
}

function filterDogs (dogs) {
    const dogBar = document.querySelector("#dog-bar")
    const filterButton = document.querySelector("#good-dog-filter")
    
    let dogsFiltered = []
    
    if (filterButton.textContent !== "Filter good dogs: OFF") {
        dogsFiltered = dogs.filter(dog => dog.isGoodDog === true)
        dogBar.innerHTML = ""
    } else {
        dogBar.innerHTML = ""
        dogsFiltered = dogs
    }

    console.log(dogs)
    console.log(dogsFiltered)

    dogCard(dogsFiltered)
}


function createDogInfo (dog, dogs) {
    console.log(dog.name)
    
    const dogInfo = document.querySelector("#dog-info")

    dogInfo.innerHTML = ""

    const dogImage = document.createElement("img")
        dogImage.src = dog.image

    const dogHeader = document.createElement("h2")
        dogHeader.textContent = dog.name
    
    const dogButton = document.createElement("button")
        dogButton.textContent = dog.isGoodDog === true ? "Good Dog!" : "Bad Dog!"
        dogButton.addEventListener("click", () => goodOrBad(dog, dogButton, dogs))

    dogInfo.append(dogImage, dogHeader, dogButton)

    
}

function goodOrBad (dog, dogButton, dogs) {

    dog.isGoodDog === true ? dog.isGoodDog = false : dog.isGoodDog = true

    console.log(dog)
    
    const dogPatch = {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(dog)
    }


    fetch(DOG_URL + `/${dog.id}`, dogPatch)
        .then (res => res.json())
        .then ((response) => {
            console.log(response)
            dogButton.textContent = dog.isGoodDog === true ? "Good Dog!" : "Bad Dog!"
        })
    
    filterDogs(dogs)
}

function init () {
    console.log("initiated")
    loadDogs()

}

document.addEventListener("DOMContentLoaded", init)