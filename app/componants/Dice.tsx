'use client';

import React, { useEffect, useState } from "react";
import styles from "../page.module.css"

type Dice = {
    id: number;
    value: number;
    isHeld: boolean
};

export default function Dice(props: any) {





    const drawDices = props.randomNums.map((dice: Dice) => (
        <div key={dice.id} className={dice.isHeld ? styles.diceHeld : styles.dice} onClick={() => props.freezeDie(dice.id)}><h1>{dice.value}</h1></div>
    ))
    return (
        <div className={styles.dice_container}>
            {drawDices}
        </div>
    )
}