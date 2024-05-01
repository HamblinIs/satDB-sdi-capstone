import React from 'react';
import { UserContext } from '../../App.js'
import {Login} from '../components/NewLogin/Login.jsx'
import { useNavigate } from 'react-router-dom';

export default function PopMenu() {

    let { activeUser, setActiveUser } = React.useContext(UserContext);

    const navigate = useNavigate()

    function Out() {
        setActiveUser({})
    }

    return(
        <div>
            <select>
                {activeUser.email ? (
                    <option value='Logout' onClick={Out()}>Logout</option>
                ) : (
                    <option value='Login' onClick={navigate('/MainPage/login')}>Login</option>
                )
                }
            </select>
        </div>
    )
}
