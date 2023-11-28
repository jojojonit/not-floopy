import {
    incrementCustomProperty,
    setCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const hanaElem = document.querySelector(".hana")
  const JUMP_SPEED = 0.45
  const GRAVITY = 0.0015

  
  let isJumping
  let dinoFrame
  let currentFrameTime
  let yVelocity

  export function setupHana() {
    isJumping = false
    yVelocity = 0
    setCustomProperty(hanaElem, "--bottom", 0)
    document.addEventListener("keydown", onJump)
  }
  
  export function updateHana(delta, speedScale) {
    handleJump(delta)
  }

  
  export function getHanaRect() {
    return hanaElem.getBoundingClientRect()
  }
  
  export function setHanaLose() {
    hanaElem.src = "imgs/hana-stationary.png"
  }
  
  function handleJump(delta) {
    if (!isJumping) return
  
    incrementCustomProperty(hanaElem, "--bottom", yVelocity * delta)

    if (getCustomProperty(hanaElem, "--bottom") <= 0) {
      setCustomProperty(hanaElem, "--bottom", 0)
      isJumping = false
    }
      
    yVelocity -= GRAVITY * delta
    
  }

  
  function onJump(e) {
    if (e.code !== "Space" || isJumping) return
  
    yVelocity = JUMP_SPEED
    isJumping = true
  }