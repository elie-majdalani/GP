import { useAppContext } from './userContext';
export const UserInfo = () => {
    const appdata = useAppContext();
    return (
        appdata.user &&
        <div className="user-info">
            <span id="user-name">{appdata.user.displayName}</span>
            <button id="logout-btn" onClick={() => { appdata.setUser(); localStorage.clear(); window.location.href = '/login' }}></button>
            <hr/>
        </div>
    )
}