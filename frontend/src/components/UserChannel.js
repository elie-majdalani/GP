import { useState, useEffect } from 'react';
import firebase from './firebase';
import Messages from './Messages';

const UserChannel = ({ user = null, db = null }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { email, displayName, photoURL } = user;
    useEffect(() => {
        if (db) {
            const unsubscribe = db
                .collection('messages')
                .orderBy('createdAt')
                .limit(100)
                .onSnapshot(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id,
                    })).filter(message => message.email === email || message.emailto === email)
                    setMessages(data);
                })
                    return unsubscribe;
                }
    }, [db]);
    const handleOnChange = (e) => {
        setNewMessage(e.target.value);
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (db) {
            db.collection('messages').add({
                text: newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                displayName,
                photoURL,
                email
            });
            setNewMessage('');

        }
    }

    return (
        <div className='Chat'>
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
export default UserChannel; 