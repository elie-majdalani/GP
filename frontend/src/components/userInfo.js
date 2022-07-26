import { useAppContext } from './userContext';
export const UserInfo = () => {
    const appdata = useAppContext();
    return (
        appdata.user &&
        <div className="user-info">
            <span>{appdata.user.displayName}</span>
            <button onClick={() => { appdata.setUser(); localStorage.clear(); window.location.href = '/login' }}>Logout</button>
        </div>
    )
}