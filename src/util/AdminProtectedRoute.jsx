import React, { useEffect, useState, useContext } from 'react'
import { Route, useNavigate } from "react-router-dom"
import axios from "axios";
import UserContext from '../Context/AuthContext';

function AdminProtectedRoute(props) {
    const navigate = useNavigate()
    const userCtx = useContext(UserContext);

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const checkUserToken = async () => {
        const userToken = localStorage.getItem('user-token')
        if (!userToken || userToken == undefined) {
            setIsLoggedIn(false)
            return navigate('/signin')
        } else if (userCtx.isAuthenticated && userCtx.user.data.role == 'admin') {

            setIsLoggedIn(true);
        } else if (userCtx.isAuthenticated == false) {
            const token = localStorage.getItem("user-token");
            if (token) {
                const getUser = await axios.get('https://backend-for-ecomm.vercel.app/api/v1/userDashboard', {
                    headers: {
                        Authorization: token
                    }
                })
                if(getUser.data.role == 'admin'){
                    setIsLoggedIn(true);
                    userCtx.isAuthenticated = true
                }else{
                    return navigate('/signin')    
                }
            } else {
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

export default AdminProtectedRoute