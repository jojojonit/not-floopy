import { updateBase, setupBase } from "./base.js"
import { updateHana, setupHana, getHanaRect, setHanaLose } from "./hana.js"
import { updateCake, setupCake, getCakeRects} from "./obstacles.js"
// import { updateCake, setupCake, getCakeRects} from "./cake.js"
import { updateBonus, setupBonus, getBonusRects, setBonusCollected} from "./bonus.js"

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30

const gameScreen = document.querySelector("#game-screen")
const worldEl = document.querySelector(".world")
const scoreEl = document.querySelector("#score")
const startScreenEl = document.querySelector(".start-screen")
// const bonusEl = document.querySelectorAll(".bonus")
// const obstacleEl = document.querySelectorAll(".obstacle")

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
  
  updateBase(delta)
  updateHana(delta)
  // updateObstacle(delta)
  updateCake(delta) 
  updateBonus(delta)
  updateScore(delta)
  if (ifBonus()) {
    handleBonus()
  }
  if (ifLose()) return handleLose()

  

  lastTime = time
  window.requestAnimationFrame(update)
}

function ifLose() {
  const hanaRect = getHanaRect()
  
  // return getCakeRects().some(rect => isCollision(rect,hanaRect))
  return getCakeRects().some(rect => isCollision(rect,hanaRect))


}

function ifBonus() {
  const hanaRect = getHanaRect()

  return getBonusRects().some(rect => isCollision(rect,hanaRect)) 
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
  setupBase()
  setupHana()
  // setupObstacle()
  setupCake() 
  setupBonus()
  
  startScreenEl.classList.add("hide")
  window.requestAnimationFrame(update)
}

function handleLose() {
  setHanaLose()
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true })
    startScreenEl.classList.remove("hide")
    startScreenEl.innerHTML = "SCORE: " + Math.floor(score) + " <br />hit [space] to try again"
    
  }, 100)
}

function handleBonus() {
  setBonusCollected()
  score += 100
}


function setPixelToWorldScale() {
  let worldToPixelScale
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  }

  worldEl.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  worldEl.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}


console.log("hana our happiness");


