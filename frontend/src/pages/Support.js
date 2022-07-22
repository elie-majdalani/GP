import { useState, useEffect } from 'react';
import SupportChannel from '../components/SupportChannel';
import { useAppContext } from '../components/userContext';

const Support = ({ db = null }) => {
    const appdata = useAppContext();
    const [currentEmail, setCurrentEmail] = useState('');
    const [emails] = useState([]);
    useEffect(() => {
        if (db) {
            const emailDB = db
                .collection('messages')
                .orderBy('createdAt')
                .limit(100)
                .onSnapshot(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                    data.forEach(message => {
                        if (emails.indexOf(message.email) === -1) {
                            emails.push(message.email)
                        }
                    })
                    setCurrentEmail(emails[1])
                })
            return emailDB;
        }
    }, [db, emails]);

    return (
        <div className='Chat'>
            <div className='chat-users'>
                <ul>
                    {/* adding emails buttons to the sorted chat */}
                    {emails.map(email => {
                        if (!email)
                            return null;
                        else
                            return (<li key={email}>
                                <button onClick={(e) => setCurrentEmail(e.target.value)} value={email}>{email}</button>
                            </li>)
                    })}
                </ul>
            </div>
            {/* Getting messages of the selected email */}
            <SupportChannel user={appdata.user} db={db} currentEmail={currentEmail} />
        </div>
    )
}
export default Support; 