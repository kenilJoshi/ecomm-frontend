import React, {createContext, useContext, useReducer} from "react";

const ProductContext = createContext({
    product: [],
    addProduct: (products) => {}
})

const initialState = {
    product: []
}

const productReducer = (state, action)  => {
    
    if(action.type === 'ADD_PRODUCT'){
        state.product = action.product["data"]
        return {
            ...state,
            product: action.product.data // Assuming action.product is an object with a "data" property
          };
    }

    return state
}

export function ProductContextProvider({children}){

    const [product, dispatchProductAction] = useReducer(productReducer, initialState)

    function addProduct(product) {
        console.log('here');
        dispatchProductAction({type: 'ADD_PRODUCT', product})
    }
    console.log(product);

    const productContext = {
        product: product.product,
        addProduct
    }

    return <ProductContext.Provider value={productContext}>{children}</ProductContext.Provider>
}

export default ProductContext