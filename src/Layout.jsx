import React, { useState, useEffect, useContext } from 'react'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Route, useNavigate, useLocation } from "react-router-dom"
import UserContext from './Context/AuthContext';
import axios from "axios";

function Layout() {
  const navigate = useNavigate()
  const loacation = useLocation()
  const userCtx = useContext(UserContext);


  const { pathname } = loacation

  const [checkPath, setCheckPath] = useState(false)

  const checkLocation = () => {
    if (pathname === "/signin" || pathname === "/signup" || pathname === "/forgotPassword" || pathname.includes("/reset")) {
      setCheckPath(false)
    } else {
      setCheckPath(true)
    }
  }

  useEffect(() => {
    checkLocation();
  }, [pathname]);

  const auth = async () => {
    const token = localStorage.getItem("user-token");
    console.log(token);
    if (token) {
      const getUser = await axios.get('https://backend-for-ecomm.vercel.app/api/v1/userDashboard', {
        headers: {
          Authorization: token
        }
      })
      const getwishlist = await axios.get("https://backend-for-ecomm.vercel.app/api/v1/wishlist", {
        headers: {
          Authorization: token
        }
      })
      userCtx.addWishlist(getwishlist.data.userWishlist)
      userCtx.authenticate(getUser, token)
      console.log(userCtx);
      // console.log('is it authenticated', userCtx.isAuthenticated);
    } else {
      return false
    }
  }

  useEffect(() => {
    // Call auth function when the component mounts
    auth()
  }, []);

  return (
    <div>
      {checkPath ? <Header /> : ""}
      <Outlet />
      {checkPath ? <Footer /> : ""}
    </div>
  )
}

export default Layout