import { useAppContext } from './UserContext';
export const UserInfo = () => {
    const appdata = useAppContext();
    return (
        appdata.user &&
        <div className="user-info">
            <div className="user-info-header">
                <span id="user-name">{appdata.user.displayName}</span>
                <button id="logout-btn" onClick={() => { appdata.setUser(); localStorage.clear(); window.location.href = '/login' }}></button>
            </div>
            <hr />
        </div>
    )
}