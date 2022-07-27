import React from 'react';
import { formatRelative } from 'date-fns';
import { useAppContext } from '../components/userContext';
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
                        <div className='text-title'>
                            {displayName ? <p>{displayName}</p> : null}
                        </div>
                        <p id="text">{text}</p>
                    </div>

                    {createdAt?.seconds ? (
                        <span>
                            {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
                        </span>
                    ) : null}
                </div>
            </div>
        );
    }
    else {
        return (
            <div className='other'>
                <div className='text-wrapper'>
                    <div className='text-only'>
                        <div className='text-title'>
                            {displayName ? <p>{displayName}</p> : null}
                        </div>
                        <p id="text">{text}</p>
                    </div>

                    {createdAt?.seconds ? (
                        <span>
                            {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
                        </span>
                    ) : null}
                </div>
            </div>
        );
    }
}
export default Message;