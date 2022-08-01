import styles from './SelectGame.module.css';

const SelectGame = ({ selectGame }) => {
  return (
    <div>
      <h1 className={styles.text}>Game Shack</h1>
      <div className={styles.container}>
        <div className={styles.size} onClick={() => selectGame('chess')}>
          <h3>Chess</h3>
          <img className={styles.size} src='/chess1.jpeg' alt='chess'></img>
        </div>
        <div className={styles.size} onClick={() => selectGame('checkers')}>
          <h3>Checkers</h3>
          <img className={styles.size} src='/download.png' alt='' />
        </div>
        <div className={styles.size} onClick={() => selectGame('gulper')}>
          <h3>Gulper</h3>
          <img className={styles.size} src='/gulper-io.png' alt='gulper' />
        </div>
        <div className={styles.size} onClick={() => selectGame('connect4')}>
          <h3>Connect 4</h3>
          <img className={styles.size} src='/4-i-rad.png' alt='connect4'></img>
        </div>
      </div>
    </div>
  );
};

export default SelectGame;
