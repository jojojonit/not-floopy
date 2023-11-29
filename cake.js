import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"
import { updateObstacle, setupObstacle, getObstacleRects } from "./obstacles.js"

const SPEEDCAKE = .05
const CAKE_INTERVAL_MIN = 10000
const CAKE_INTERVAL_MAX = 40000
const worldEl = document.querySelector(".world")
const obstacle = document.querySelectorAll(".obstacle")



let nextCakeTime
let nextObstacleTime

export function setupCake() {
   
    nextCakeTime = CAKE_INTERVAL_MIN
    document.querySelectorAll(".cake").forEach(cake => {
        cake.remove()
    })
}

export function updateCake(delta) {

    setTimeout(() => {
        if (obstacle,"--left" === 0) {
          updateCake();
        } else {
            console.log("Condition not met");
          }
      }, 800);
    
   
    document.querySelectorAll("[data-cake]").forEach(cake => {
        incrementCustomProperty(cake, "--left", delta * SPEEDCAKE * -1)
        if (getCustomProperty(cake, "--left") <= -100) {
        cake.remove()
        }
    })

    if(nextCakeTime <= 0) {
        createCake()
        nextCakeTime = 5000
                        
    }
    nextCakeTime -= delta
}





function createCake() {
    const cake = document.createElement("img")
    cake.dataset.cake = true
    cake.src = "imgs/cake.png"
    cake.classList.add("cake")
    setCustomProperty(cake, "--left", 100)
    setCustomProperty(cake,"--bottom", 0)
    worldEl.append(cake)
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}