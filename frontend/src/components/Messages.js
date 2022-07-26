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
    if(email === appdata.user.email){
    return (
        <div className='user'>
            {displayName ? <p>{displayName}</p> : null}
            {createdAt?.seconds ? (
                <span>
                    {formatRelative(new Date(createdAt.seconds*1000), new Date())}
                </span>
            ) : null}
            <p>{text}</p>
        </div>
    );
            }
    else{
        return (
            <div className='other'>
                {displayName ? <p>{displayName}</p> : null}
                {createdAt?.seconds ? (
                    <span>
                        {formatRelative(new Date(createdAt.seconds*1000), new Date())}
                    </span>
                ) : null}
                <p>{text}</p>
            </div>
        );
    }
}
export default Message;