import React, {useEffect, useState, useContext} from 'react'
import { Route, useNavigate} from "react-router-dom"
import axios from "axios";
import UserContext from '../Context/AuthContext';

function ProtectedRoute(props) {
    const navigate = useNavigate()
    const userCtx = useContext(UserContext);

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isUser, setIsUser] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const checkUserToken = async () => {
        const userToken = localStorage.getItem('user-token')
        if(!userToken || userToken == undefined){
            setIsLoggedIn(false)
            return navigate('/signin')
        }else if(userCtx.isAuthenticated){
            setIsLoggedIn(true);
        }else if(userCtx.isAuthenticated == false){
            const token = localStorage.getItem("user-token");
            if (token) {
                userCtx.isAuthenticated = true
            }else{
                return navigate('/signin')
            }
            // return navigate('/signin')
        }
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

  return (
    <div>{
        userCtx.isAuthenticated ? props.children : navigate('/signin')
    }</div>
  )
}

export default ProtectedRoute