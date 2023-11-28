 import { updateHana, setupHana, getHanaRect, setHanaLose } from "./hana.js"
 import { updateObstacle, setupObstacle, getObstacleRects } from "./obstacles.js"

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 200

const gameScreen = document.querySelector("#game-screen")
const worldEl = document.querySelector(".world")
const scoreEl = document.querySelector("#score")
const startScreenEl = document.querySelector(".start-screen")
const loseScreenEL = document.querySelector(".lose-screen")

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, {once:true})

let lastTime
let score

function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime
  
  updateHana(delta)
  updateObstacle(delta)
  updateScore(delta)
  if (ifLose()) return handleLose()

  

  lastTime = time
  window.requestAnimationFrame(update)
}

function ifLose() {
  const hanaRect = getHanaRect()
  
  return getObstacleRects().some(rect => isCollision(rect,hanaRect))
}

function isCollision (rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
    )
}

function updateScore(delta) {
  score += delta * 0.01
  scoreEl.textContent = Math.floor(score)
}

function handleStart() {
  lastTime = null
  score = 0
  setupHana()
  setupObstacle()
  startScreenEl.classList.add("hide")
  // loseScreenEl.classList.add("hide")
  window.requestAnimationFrame(update)
}

function handleLose() {
  setHanaLose()
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true })
    startScreenEl.classList.remove("hide")
    startScreenEl.innerHTML ="score <br />hit [space] to try again"
    
  }, 100)
}


function setPixelToWorldScale() {
  let worldToPixelScale
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  }

  worldEl.style.width = '${WORLD_WIDTH * worldToPixelScale}px'
  worldEl.style.height = '${WORLD_HEIGHT * worldToPixelScale}px'
}

function main() {

}

main()
