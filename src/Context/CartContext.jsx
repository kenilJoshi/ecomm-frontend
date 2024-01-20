import React, { useReducer, useEffect, createContext, Children } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { }
})
const initialState = {
    items: []
}

function cartReducer(state, action) {

    if (action.type == 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id == action.item.id)

         const updatedItems = [...state.items]

        if(existingCartItemIndex > -1){
            const updatedItem = {
                ...state.items[existingCartItemIndex],
                quantities: state.items[existingCartItemIndex].quantities + 1,
                prices: state.items[existingCartItemIndex].price * (state.items[existingCartItemIndex].quantities + 1) 
            }
            updatedItems[existingCartItemIndex] = updatedItem
        }else{
            updatedItems.push({...action.item, quantities: 1, prices: action.item.price})

        }
        return {...state, items: updatedItems}
    }
    if (action.type == 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id == action.id)
        const existingCartItem = state.items.filter((item) => item.id == action.id)

        const updatedItems = [...state.items] 
        
        if(existingCartItem){
            updatedItems[existingCartItemIndex].quantities = updatedItems[existingCartItemIndex].quantities - 1
            updatedItems[existingCartItemIndex].prices = updatedItems[existingCartItemIndex].prices - updatedItems[existingCartItemIndex].price
            
            if(updatedItems[existingCartItemIndex].quantities == 0){
                state.items.splice(existingCartItemIndex, 1)
                return {...state}
            }
            return {...state, items: updatedItems}
        }
    }

    return state
}

export function CartContextProvider({ children }) {

    const [cart, dispatchCartAction] = useReducer(cartReducer, initialState)

    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item: item })
    }

    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id: id })
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem
    }
    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext