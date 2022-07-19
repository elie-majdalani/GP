import { useContext, useState } from "react";
import { userContext } from '../components/userContext';
import {Sidenav} from "../components/Sidenav";

export const Records = () => {
    const { user } = useContext(userContext);
    

    return (
        <>
            <Sidenav />
            <div className="table">
                <h1>Table</h1>
                <p>User: {user.email}</p>
            </div>
        </>
    )
}