
/* eslint-disable */
import {useState} from "react";
import styles from './Room.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChess, faChessBoard, faCircle, faGamepad, faGripHorizontal, faUsers} from '@fortawesome/free-solid-svg-icons'
// import {faComment} from '@fortawesome/free-solid-svg-icons'
const Room = ({startGame}) => {
    const [username, setUsername] = useState("")
    const [game, setGame] = useState(null)
    const [id, setId] = useState('')

    const [userValidation, setUserValidation] = useState({});
    const [error, setError] = useState({ userName: false, id: false, game: false });

    const handleCreateGame = (mode) => {
        if(username === ''){
            setError(prevState => ({...prevState, userName: true}))
            return
        } else if (!game) {
            setError(prevState => ({...prevState, game: true}))
        }

        startGame(game, mode, username)
    }

    const handleJoinGame = (mode, id) =>{
        if(username === ''){
            setError(prevState => ({...prevState, userName: true}))
            return
        } else if (id === '') {
            setError(prevState => ({...prevState, id: true}))
            return
        } else if (!game) {
            setError(prevState => ({...prevState, game: true}))
        }

        startGame(game, mode, username, id)
    }

    const displayUserIsRequired = () => {
        if(error.userName){
            return <div>user name is required</div>
        }
    }
    const displayIdIsRequired = () => {
        if(error.id){
            return <div>must enter match id</div>
        }
    }

    const displayGameIsRequired = () => {
        if (error.game) {
            return <div>Must select a game</div>
        }
    }

    const gameTitle = () => {
        switch (game) {
            case 'chess':
                return <h1><FontAwesomeIcon icon={faChess} /> {game} </h1>
            case 'checkers':
                return  <h1><FontAwesomeIcon icon={faChessBoard}/> {game}</h1>
            case 'connect4':
                return  <h1><FontAwesomeIcon icon={faGripHorizontal}/> {game}</h1>
            default:
                return <h1>Custom Games</h1>
        }
    }


    return (
        <div className={styles.container}>
        <div className={styles.joinContainer}>
            <header className={styles.joinHeader}>
                {gameTitle()}
            </header>
            <main className={styles.joinMain}>
                <div className={styles.formControl}>
                    <h3><FontAwesomeIcon icon={faUsers} /> Lobby</h3>
                    <input type={'text'} placeholder={'username'} value={username} onChange={(e) => setUsername(e.target.value)}  />
                    {displayUserIsRequired()}
                </div>

                <h3 className={styles.selectMode}>Select Game</h3>
                {displayGameIsRequired()}
                <div className={styles.icons}>
                    <img className={game === 'chess' ? styles.selected : '' + styles.icon} onClick={() => setGame('chess')} width={100} height={100} src={'/chess1.jpeg'} />
                    <img className={game === 'checkers' ? styles.selected : '' + styles.icon} onClick={() => setGame('checkers')} width={100} height={100} src={'/checkers.png'} />
                    <img className={game === 'connect4' ? styles.selected : '' + styles.icon} onClick={() => setGame('connect4')} width={100} height={100} src={'/connect4.png'} />
                </div>

                <h3 className={styles.selectMode}>Select Mode</h3>
                <button  onClick={() => handleCreateGame(1)} className={styles.btn}>Play Unranked Match</button>
                <button onClick={() => handleCreateGame(2)} className={styles.btn}>Create Private Match</button>
                <input type={'text'} placeholder={'room id'}  value={id} onChange={(e) => setId(e.target.value)}/>
                {displayIdIsRequired()}
                <button onClick={() => handleJoinGame(2, id) } className={styles.btn}>Join Private Match</button>
            </main>
        </div>
        </div>
    )
}

export default Room