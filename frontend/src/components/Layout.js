import { useAppContext } from '../components/userContext';
import { SideNav } from './Sidenav';
export const Layout = ({ children }) => {
    const appdata = useAppContext();
    return (
        appdata.user ? (
            <div>
                <div className="layout">
                    <SideNav />
                </div>
                <main>{children}</main>
                <div className="user-info">
                    <span>{appdata.user.displayName}</span>
                    <button onClick={() => { appdata.setUser(); localStorage.clear();window.location.href = '/login' }}>Logout</button>
                </div>
            </div>
        ) : (
            <main>{children}</main>
        ))
}