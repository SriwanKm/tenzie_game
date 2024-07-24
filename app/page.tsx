'use client';
import Image from "next/image";
import styles from "./page.module.css";
import Dice from "./componants/Dice";
import diceData from "./diceData"
import React, { useState, useEffect } from "react"

export default function Home() {

  const [rollCount, setRollCount] = useState(1000)



  const [randomNums, setRandomNums] = useState(diceData);


  useEffect(() => (setRandomNums(prevState => (
    prevState.map(dice => (
      { ...dice, value: Math.ceil(Math.random() * 6) }
    ))
  ))), [])


  function freezeDie(id: Number) {
    setRandomNums(prevState => (prevState.map(dice => (

      dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
    ))))
  }

  function isGameOver(): boolean {
    let firstDie = randomNums[0].value
    return randomNums.every(die => die.value === firstDie) // true
  
  }


  function rollDice() {
    setRandomNums(prevState => (
      prevState.map(dice => (
        dice.isHeld ? dice : { ...dice, value: Math.ceil(Math.random() * 6) }
      ))
    ))
    setRollCount(prevCount => prevCount - 10)
  }

  function resetDice() {
    setRandomNums(prevState => (
      prevState.map(dice => (
        { ...dice, value: Math.ceil(Math.random() * 6), isHeld: false }

      ))
    ))
    setRollCount(1000)
  }

  let allDiceHeld = randomNums.every(die=> die.isHeld)

  // whatever dice is clicked, freez it
  // until all 10 dices are clicked
  // show restart game

  let header = allDiceHeld ? <div className={styles.score}>Your score: {rollCount}</div> : <div><h1>Tenzies</h1>Roll until all dice are the same. Click each die to freeze it at its current value between roll.</div>
  let button = isGameOver() ? <div className={styles.roll} onClick={resetDice}>Reset</div> : <div className={styles.roll} onClick={rollDice}>Roll</div>

  return (
    <main className={styles.main}>
      <div className={styles.innerborder}>
        {header}

        <Dice
          freezeDie={freezeDie}
          randomNums={randomNums}
        />
        {button}
      </div>
    </main>
  );
}
