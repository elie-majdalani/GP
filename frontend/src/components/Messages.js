import React from 'react';
import { formatRelative } from 'date-fns';
import { useAppContext } from '../components/UserContext';
const Message = ({
    createdAt = null,
    text = '',
    displayName = '',
    email = '',
    photoURL = '',
}) => {
    const appdata = useAppContext();
    if (email === appdata.user.email) {
        return (
            <div className='user'>
                <div className='text-wrapper'>
                    <div className='text-only'>
                        <p id="text">{text}</p>
                    </div>
                    <div className='text-date'>
                        {createdAt?.seconds ? (
                            <span>
                                {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
                            </span>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className='other'>
                <div className='text-wrapper'>
                    <div className='text-only'>
                        <p id="text">{text}</p>
                    </div>
                    <div className='text-date'>
                        {createdAt?.seconds ? (
                            <span>
                                {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
                            </span>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}
export default Message;