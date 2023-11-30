import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEED = 0.05
const baseEl = document.querySelectorAll("[data-base")

export function setupBase() {
    setCustomProperty(baseEl[0], "--left", 0)
    setCustomProperty(baseEl[1], "--left", 300)
}

export function updateBase(delta) {
    baseEl.forEach(base => {
        incrementCustomProperty(base, "--left", delta  * SPEED * -1)

        if (getCustomProperty(base, "--left") <= -300) {
            incrementCustomProperty(base, "--left", 600)
        }
    })
}