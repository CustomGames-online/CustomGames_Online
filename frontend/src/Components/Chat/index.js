/* eslint-disable */
import io from 'socket.io-client';

import {useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faComments, faFaceSmile} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import styles from './styles.module.css'


const Chat = ({sendMessage, messages, users, exit}) => {

    console.log(users)
    console.log(messages)
    const [message, setMessage] = useState('')


    const handleChange = (event) =>{
        setMessage(event.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        sendMessage(message)
        e.stopPropagation()
        setMessage('')
    }

   return(

       <div className={styles.chatContainer}>
           <header className={styles.chatHeader}>
               <h1><FontAwesomeIcon icon={faFaceSmile} />  Custom Games</h1>
               <button className={styles.btn} onClick={exit}>Leave Room</button>
           </header>
           <main className={styles.chatMain}>
               <div className={styles.chatSidebar}>

                   <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
                   <h3 className={styles.h3}>Users</h3>
                   <ul className={styles.ul}>
                       {users.map(user => <li className={styles.chatDesign} key={user}>{user}</li>)}
                   </ul>
               </div>
               <div className={styles.chatMessages}>
                   {messages.map(message => (
                       <div key={message.message} className={styles.messageContainer}>
                           <p className={`${styles.Meta}`}>{message.player}</p>
                           <p className={styles.Message}>{message.message}</p>
                       </div>
                       ))}
               </div>
           </main>
           <div className={styles.chatFormContainer}>
               <form onSubmit={handleSubmit} className={styles.form} >
                   <input type="text" value={message} onChange={handleChange}
                          id="msg"
                          placeholder="Enter Message"
                          required
                          autoComplete="off"
                   />
                   <button className={styles.btn}><FontAwesomeIcon icon={faPaperPlane} />Send</button>

               </form>
           </div>

       </div>
   );
}

export default Chat;


//     [] Chat
//     [] Ui
//     [] AWS Server
//     [] Pull & Push Code Github



