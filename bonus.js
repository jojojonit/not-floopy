import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEED = .05
const BONUS_INTERVAL_MIN = 2000
const BONUS_INTERVAL_MAX = 4000
const worldEl = document.querySelector(".world")

let nextBonusTime

export function setupBonus() {
    nextBonusTime = BONUS_INTERVAL_MIN
    document.querySelectorAll(".bonus").forEach(bonus => {
        bonus.remove()
    })
}

export function updateBonus(delta) {
    document.querySelectorAll("[data-bonus]").forEach(bonus => {
        incrementCustomProperty(bonus, "--left", delta * SPEED * -1)
        if (getCustomProperty(bonus, "--left") <= -100) {
        bonus.remove()
        }
    })

    if(nextBonusTime <= 0) {
        createBonus()
        nextBonusTime = randomNumberBetween(BONUS_INTERVAL_MIN, BONUS_INTERVAL_MAX)
                        
    }
    nextBonusTime -= delta
}

export function getBonusRects() {
    return [...document.querySelectorAll(".bonus")].map(bonus => {
        return bonus.getBoundingClientRect()
    })
}

export function setBonusCollected() {
    document.querySelectorAll(".bonus").forEach(bonus =>
        setCustomProperty(bonus, "display", "none"))
    }

function createBonus() {
    const bonus = document.createElement("img")
    bonus.dataset.bonus = true
    bonus.src = "imgs/bonus.png"
    bonus.classList.add("bonus")
    setCustomProperty(bonus, "--left", 100)
    setCustomProperty(bonus,"--top", 20)
    worldEl.append(bonus)
}


function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}