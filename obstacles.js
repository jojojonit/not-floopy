import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEEDCAKE = .05
const CAKE_INTERVAL_MIN = 500
const CAKE_INTERVAL_MAX = 2000
const worldEl = document.querySelector(".world")

let nextCakeTime
export function setupCake() {
   
    nextCakeTime = CAKE_INTERVAL_MIN
    document.querySelectorAll(".cake").forEach(cake => {
        cake.remove()
    })
}

export function updateCake(delta) {

    document.querySelectorAll("[data-cake]").forEach(cake => {
        incrementCustomProperty(cake, "--left", delta * SPEEDCAKE * -1)
        if (getCustomProperty(cake, "--left") <= -100) {
        cake.remove()
        }
    })

    if(nextCakeTime <= 0) {
        createCake()
        nextCakeTime = 
        randomNumberBetween(CAKE_INTERVAL_MIN, CAKE_INTERVAL_MAX)
                        
    }
    nextCakeTime -= delta
}

export function getCakeRects() {
    return [...document.querySelectorAll(".cake")].map(cake => {
        return cake.getBoundingClientRect()
    })
}



function createCake() {
    const cake = document.createElement("img")
    cake.dataset.cake = true
    const isAlternative = Math.random() < 0.5;
    cake.src = isAlternative ? "imgs/cake.png" : "imgs/carrot.png";
    cake.classList.add("cake")
    setCustomProperty(cake, "--left", 100)
    setCustomProperty(cake,"--bottom", 0)
    worldEl.append(cake)
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}