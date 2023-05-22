const MAX_ATTACKS = 3
let BOSS_HP = 80
let GAME_MESSAGE = ""
const BOSS_STATE = {
    full: true,
    half: false,
    dead: false,
}

const ATTACK_ICON_URLS = [
    'https://www.clipartmax.com/png/small/406-4066861_fight-knockout-kungfu-power-punch-super-icon-fight-knockout-kungfu-power-punch.png',
    'https://static.thenounproject.com/png/882198-200.png',
    'https://static.thenounproject.com/png/882194-200.png'
]

const imgContainerElement = document.getElementsByClassName('image-container')[0]
const gameMessageElement = document.getElementsByClassName('game-message')[0]
const bossElement = document.getElementsByClassName('boss')[0]

const attackValues = Array.apply(null, Array(MAX_ATTACKS)).map((v, i) => {
    imgContainerElement.append( generateImageElement(i) )
    v = rollRandomNumber()
    return v
})



addListener()




function generateImageElement(indexValue) {
    const imgElement = document.createElement('img')
    imgElement.setAttribute('src', ATTACK_ICON_URLS[indexValue] )
    imgElement.classList.add('image')
    imgElement.dataset.index = indexValue
    return imgElement
}

function handleClick(event) {
    const indexValue = event.target.dataset.index
    if (indexValue) {
        const damageValue = attackValues[indexValue]
        BOSS_HP -= damageValue
        updateBossImage()

        renderMessage('You hit for ' + damageValue + ' damage!')

        console.log('[!HIT!] DAMAGE: ' + damageValue )
        console.log('[!HIT!] BOSS_HP: ' + BOSS_HP )

        if (gameIsOver()) {
            removeListener()
            renderMessage("Victory!")
        }
    }
}

function updateBossImage() {
    if (BOSS_HP < 41 && BOSS_STATE.full) {
        bossElement.classList.remove('boss-full-hp')
        bossElement.classList.add('boss-half-hp')
        BOSS_STATE.full = false
        BOSS_STATE.half = true
    } else if (BOSS_HP < 1 && BOSS_STATE.half) {
        bossElement.classList.remove('boss-half-hp')
        bossElement.classList.add('boss-no-hp')
        BOSS_STATE.half = false
        BOSS_STATE.dead = true
    }
}

function renderMessage( message ) {
    gameMessageElement.innerHTML = message

    // setTimeout(function() {
    //     gameMessageElement.innerHTML = ''
    // }, 3000)
}

function clearMessage() {
    gameMessageElement.innerHTML = ''
}

function gameIsOver() {
    return BOSS_HP < 1
}

function addListener() {
    imgContainerElement.addEventListener('click', handleClick)
}

function removeListener() {
    imgContainerElement.removeEventListener('click', handleClick)
}

function rollRandomNumber() {
    return Math.ceil(Math.random() * 10)
}