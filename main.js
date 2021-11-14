const positions = {
  circle: [],
  cross: []
}

function draw (cell, shape) {
  cell.innerHTML = `<div class=${shape} />`
}

function getMostValuableNumber (myNums, opponentNums) {
  const remainedNums = getRandomNumberArray(9).filter(num => ![...myNums, ...opponentNums].includes(num))
  for (let i = 0; i < remainedNums.length; i++) {
    if (isWinning(remainedNums[i], myNums)) {
      return remainedNums[i]
    }
  }
  for (let i = 0; i < remainedNums.length; i++) {
    if (isWinning(remainedNums[i], opponentNums)) {
      return remainedNums[i]
    }
  }
  for (let i = 0; i < remainedNums.length; i++) {
    if (getNumberOfTwoStepWinningWays(remainedNums[i], opponentNums, myNums) > 1 && getNumberOfTwoStepWinningWays(remainedNums[i], myNums, opponentNums) > 0) {
      return remainedNums[i]
    }
  }
  if (remainedNums.includes(5)) {
    return 5
  }
  for (let i = 0; i < remainedNums.length; i++) {
    if (remainedNums[i] % 2 === 0 && getNumberOfTwoStepWinningWays(remainedNums[i], myNums, opponentNums) > 0) {
      return remainedNums[i]
    }
  }
  for (let i = 0; i < remainedNums.length; i++) {
    if (remainedNums[i] % 2 === 1 && getNumberOfTwoStepWinningWays(remainedNums[i], myNums, opponentNums) > 0) {
      return remainedNums[i]
    }
  }
  return remainedNums[0]
}

function getRandomNumberArray (count) {
  const number = Array.from(Array(count)).map((value, index) => index + 1)
  for (let index = number.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[number[index], number[randomIndex]] = [number[randomIndex], number[index]]
  }
  return number
}

function isWinning (chosenNum, myNums) {
  for (let i = 0; i < myNums.length; i++) {
    const targetNum = 15 - chosenNum - myNums[i]
    if (myNums.includes(targetNum) && myNums[i] !== targetNum) {
      return true
    }
  }
  return false
}

function getNumberOfTwoStepWinningWays (chosenNum, myNums, opponentNums) {
  const remainedNums = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(num => ![chosenNum, ...myNums, ...opponentNums].includes(num))
  let numberOfWinningWays = 0
  for (let i = 0; i < remainedNums.length; i++) {
    if (isWinning(remainedNums[i], [chosenNum, ...myNums])) {
      numberOfWinningWays++
    }
  }
  return numberOfWinningWays
}

document.querySelectorAll('#app td').forEach(cell => {
  cell.addEventListener('click', event => {
    if (event.target.tagName !== 'TD') {
      return
    }
    draw(event.target, 'circle')
    isWinning(Number(event.target.dataset.index), positions.circle)
    positions.circle.push(Number(event.target.dataset.index))
    const pickingNumber = getMostValuableNumber(positions.cross, positions.circle)
    const drawingPosition = document.querySelector(`#position-${pickingNumber}`)
    positions.cross.push(pickingNumber)
    draw(drawingPosition, 'cross')
  })
})

document.querySelector('#computer-move-btn').addEventListener('click', event => {
  event.target.style.display = 'none'
  const pickingNumber = getMostValuableNumber(positions.cross, positions.circle)
  const drawingPosition = document.querySelector(`#position-${pickingNumber}`)
  positions.cross.push(pickingNumber)
  draw(drawingPosition, 'cross')
})
