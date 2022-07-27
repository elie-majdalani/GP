import { useEffect, useState } from "react";
import firebase from './firebase';
import Messages from './Messages';

const SupportChannel = ({ db, currentEmail, user }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { email, displayName, photoURL } = user;
    useEffect(() => {
        if (db) {
            //get messages for sepecific user
            const messagesDB = db
                .collection('messages')
                .orderBy('createdAt')
                .limit(100)
                .onSnapshot(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id,
                    })).filter(message => message.email === currentEmail || message.emailto === currentEmail)
                    setMessages(data)
                })
            return messagesDB;
        }
    }, [db, currentEmail]);
    const handleOnChange = (e) => {
        setNewMessage(e.target.value);
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (db) {
            // add message to the database with the current user
            db.collection('messages').add({
                text: newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                displayName,
                photoURL,
                email,
                emailto: currentEmail,
            });
            setNewMessage('');

        }
    }
    return (
        <div className="support-chat">
            <div className="wallet-body-header">
                <div className="wallet-body-header-title-wrapper">
                    <div className="wallet-body-header-title">
                        <h1>Wallet</h1>
                    </div>
                    <div className="wallet-body-header-hr">
                        <hr />
                    </div>
                </div>
            </div>
            <ul>
                {messages.map(message => (
                    <li key={message.id}>
                        <Messages {...message} />
                    </li>
                ))}
            </ul>
            <form onSubmit={handleOnSubmit}>
                <input type="text" onChange={handleOnChange} value={newMessage} placeholder="Send Message" />
                <button type="submit" disabled={!newMessage} onClick={handleOnSubmit}>Send</button>
            </form>
        </div>
    )
}
export default SupportChannel;