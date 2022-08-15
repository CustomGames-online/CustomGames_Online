/* eslint-disable */
import { useState } from "react";
import styles from './styles.module.css';
import Icon from './Icon'

const SelectGame = ({ selectGame }) => {
    return (

        <div className={styles.webColor}>

        <div className={styles.container}>
            <h1 className={styles.text}>Custom Games</h1>
            <div className={styles.flex}>
                <Icon game={'connect4'} selectGame={selectGame}/>
                <Icon game={'checkers'} selectGame={selectGame}/>
                <Icon game={'chess'} selectGame={selectGame}/>
            </div>
        </div>
        </div>

  );
};

export default SelectGame;
