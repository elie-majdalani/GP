import { useAppContext } from '../components/userContext';
import { SideNav } from './Sidenav';
import firebase from './firebase';
import UserChannel from "../components/UserChannel";
export const Layout = ({ children }) => {
    const db = firebase.firestore();
    const appdata = useAppContext();
    return (
        appdata.user && appdata.user.role === "user" ? (
            <div>
                <div className="layout">
                    <SideNav />
                </div>
                <main>{children}</main>
                <div className="user-info">
                    <span>{appdata.user.displayName}</span>
                    <button onClick={() => { appdata.setUser(); localStorage.clear(); window.location.href = '/login' }}>Logout</button>
                    <UserChannel user={appdata.user} db={db} />
                </div>
            </div>
        ) : (
            <div>
                {appdata.user&&(<button onClick={() => { appdata.setUser(); localStorage.clear(); window.location.href = '/login' }}>Logout</button>)}
                <main>{children}</main>
            </div>
        ))
}