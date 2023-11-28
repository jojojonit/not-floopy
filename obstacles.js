import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEED = .05
const OBSTACLE_INTERVAL_MIN = 500
const OBSTACLE_INTERVAL_MAX = 2000
const worldEl = document.querySelector(".world")

let nextObstacleTime

export function setupObstacle() {
    nextObstacleTime = OBSTACLE_INTERVAL_MIN
    document.querySelectorAll(".obstacle", "obstacleTop").forEach(obstacle => {
        obstacle.remove()
    })
}

export function updateObstacle(delta) {
    document.querySelectorAll("[data-obstacle]", "[data-obstacleTop]").forEach(obstacle => {
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
    return [...document.querySelectorAll(".obstacle", ".obstacleTop")].map(obstacle => {
        return obstacle.getBoundingClientRect()
    })
}

function createObstacle() {
    const obstacle = document.createElement("img")
    const obstacleTop = document.createElement("img")
    obstacle.dataset.obstacle = true
    obstacleTop.dataset.obstacleTop = true
    obstacle.src = "imgs/carrot.png"
    obstacleTop.src = "imgs/carrot.png"
    obstacle.classList.add("obstacle")
    obstacleTop.classList.add("obstacleTop")
    setCustomProperty(obstacle, "--left", 100)
    setCustomProperty(obstacle,"--bottom", 0)
    setCustomProperty(obstacleTop, "--left", 100)
    setCustomProperty(obstacleTop,"--top", 0)
    worldEl.append(obstacle)
    worldEl.append(obstacleTop)
}





function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

