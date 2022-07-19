import React from 'react';
import { formatRelative } from 'date-fns';
const Message = ({
    createdAt = null,
    text = '',
    displayName = '',
    photoURL = '',
}) => {
    return (
        <div>
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
export default Message;