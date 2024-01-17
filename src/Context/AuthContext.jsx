import React, {createContext, useEffect, useReducer} from "react";
import { useNavigate } from "react-router-dom";


const UserContext = createContext({
    isAuthenticated: false,
    user: null,
    token: null,
    address: null,
    wishlist: null,
    authenticate: (user, token) => {},
    login: (user, token) => {},
    logout: () => {},
    addAddress: (address) => {},
    addWishlist: (list) => {},
    removeWishlist: (id) => {}
})

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    address: null,
    wishlist: null
}

const userReducer =  (state, action) => {

    if(action.type === 'LOGIN'){
        console.log('in authcontext',action);
        localStorage.clear()
        localStorage.setItem('user-token', `Bearer ${action.token}`)
        state.token = action.token
        state.user = action.user
        state.isAuthenticated = true
        // action.navigate('/')
        return {...state, user: action.user, token: action.token}
    }

    if(action.type === 'AUTHENTICATE'){
        // console.log('here');
        state.user = action.user
        state.token = action.token
        state.isAuthenticated = true
        return {...state}
        // console.log(ken);
    }
    
    if(action.type === 'LOGOUT'){
        localStorage.clear()
        state.user = null
        state.token = null
        state.isAuthenticated = false
        return {...state}
    }

    if(action.type === "ADDRESS"){
        state.address = action.address
        return {...state}
    }

    if(action.type === 'ADD_WISHLIST'){
        if(state.wishlist == null){
            state.wishlist = [...action.list]
        }else{
            state.wishlist.push(...action.list)
        }
        return {...state, wishlist: state.wishlist}
    }

    if(action.type === 'REMOVE_WISHLIST'){
        return {
            ...state,
            wishlist: state.wishlist.filter(item => item.id !== action.id)
        };
    }
    return state
}

export function UserContextProvider({children}) {
    const navigate = useNavigate()
    const [user, dispatchUserAction] = useReducer(userReducer, initialState)

    function login(user, token){
        dispatchUserAction({type: 'LOGIN', user, token, navigate})
    }

    function authenticate(user, token){
        dispatchUserAction({type: 'AUTHENTICATE', user, token})
    }

    function logout(){
        dispatchUserAction({type: 'LOGOUT'})
    }

    function addAddress(address){
        dispatchUserAction({type: 'ADDRESS', address: address})
    }

    function addWishlist(list){
        dispatchUserAction({type: 'ADD_WISHLIST', list: list})
    }

    function removeWishlist(id){
        dispatchUserAction({type: 'REMOVE_WISHLIST', id: id})
    }

    const userContext = {
        isAuthenticated: user.isAuthenticated,
        user: user.user,
        token: user.token,
        address: user.address,
        wishlist: user.wishlist,
        authenticate,
        login,
        logout,
        addAddress,
        addWishlist,
        removeWishlist
    }
    const contextValue = {
        ...userContext,
      };

      console.log(contextValue);

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}

export default UserContext
