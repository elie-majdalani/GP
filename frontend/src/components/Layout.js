import { useAppContext } from '../components/userContext';
import { SideNav } from './Sidenav';
import firebase from './firebase';
import UserChannel from "../components/UserChannel";
import { useState } from 'react';

export const Layout = ({ children }) => {
    const [isMessages, setIsMessages] = useState(true);
    const db = firebase.firestore();
    const appdata = useAppContext();
    return (
        appdata.user && appdata.user.role === "user" ? (
            <div className='main-wrapper-div'>
                <div className="layout">
                    <SideNav setIsMessages={setIsMessages} isMessages={isMessages} />
                </div>
                <main>{children}</main>
                <div className="user-info">
                    <span>{appdata.user.displayName}</span>
                    <button onClick={() => { appdata.setUser(); localStorage.clear(); window.location.href = '/login' }}>Logout</button>
                    {isMessages &&
                    <UserChannel user={appdata.user} db={db} />}
                </div>
            </div>
        ) : (
            <div>
                {appdata.user && (<button onClick={() => { appdata.setUser(); localStorage.clear(); window.location.href = '/login' }}>Logout</button>)}
                <main>{children}</main>
            </div>
        ))
}