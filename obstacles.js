import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEED = .05
const OBSTACLE_INTERVAL_MIN = 500
const OBSTACLE_INTERVAL_MAX = 2000
const SPEEDCAKE = .05
const CAKE_INTERVAL_MIN = 10000
const CAKE_INTERVAL_MAX = 40000
const worldEl = document.querySelector(".world")


let nextObstacleTime
let nextCakeTime

export function setupObstacle() {
    nextObstacleTime = OBSTACLE_INTERVAL_MIN
    document.querySelectorAll(".obstacle").forEach(obstacle => {
        obstacle.remove()
    })
}

export function updateObstacle(delta) {
    document.querySelectorAll("[data-obstacle]").forEach(obstacle => {
        incrementCustomProperty(obstacle, "--left", delta * SPEED * -1)
        if (getCustomProperty(obstacle, "--left") <= -100) {
        obstacle.remove()
        }
    })

    if(nextObstacleTime <= 0) {
        createObstacle()
        nextObstacleTime = randomNumberBetween(OBSTACLE_INTERVAL_MIN, OBSTACLE_INTERVAL_MAX)
                        
    }
    nextObstacleTime -= delta
}

export function getObstacleRects() {
    return [...document.querySelectorAll(".obstacle")].map(obstacle => {
        return obstacle.getBoundingClientRect()
    })
}

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
        nextCakeTime = 7000
                        
    }
    nextCakeTime -= delta
}

export function getCakeRects() {
    return [...document.querySelectorAll(".cake")].map(cake => {
        return cake.getBoundingClientRect()
    })
}

function createObstacle() {
    const obstacle = document.createElement("img")
    obstacle.dataset.obstacle = true
    obstacle.src = "imgs/carrot.png"
    obstacle.classList.add("obstacle")
    setCustomProperty(obstacle, "--left", 100)
    setCustomProperty(obstacle,"--bottom", 0)
    worldEl.append(obstacle)
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

