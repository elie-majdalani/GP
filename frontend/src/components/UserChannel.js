import { useState, useEffect } from 'react';
import firebase from './firebase';
import Messages from './Messages';
import { useAppContext } from './userContext';

const UserChannel = ({ db = null }) => {
    const appData = useAppContext();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');


    useEffect(() => {
        if (db && appData.user) {
            const unsubscribe = db
                .collection('messages')
                .orderBy('createdAt')
                .limit(100)
                .onSnapshot(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id,
                    })).filter(message =>
                        message.email === appData.user.email || message.emailto === appData.user.email
                    )
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
        if (db && appData.user) {
            db.collection('messages').add({
                text: newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                displayName: appData.user.displayName,
                email: appData.user.email
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
            <input type="text" onChange={handleOnChange} value={newMessage} placeholder="Send Message" />
            <button type="submit" disabled={!newMessage} onClick={handleOnSubmit}>Send</button>
        </div>
    )
}
export default UserChannel; 