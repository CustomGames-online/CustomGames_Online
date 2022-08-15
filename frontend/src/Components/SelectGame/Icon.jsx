/* eslint-disable */
import styles from "./styles.module.css";

const Icon = ({game, selectGame}) => {
    const handleClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        selectGame(game)
    }
    return (
        <div className={`${styles.iconContainer} ${styles.size}`} onClick={handleClick}>
            <h3>{game}</h3>
            <div className={`${styles.image} ${styles[game]} ${styles.icon}`}></div>
        </div>
    )
}

export default Icon