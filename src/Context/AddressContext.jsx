import { createContext, useState } from "react";

const AddressContext = createContext({
    openAddress: '',
    showAddress: () => {},
    hideAddress: () => {}
})

export function AddressContextProvider({children}) {

    const [address, setAddress] = useState('')

    function showAddress(){
        setAddress('open')
    }
    
    function hideAddress(){
        // console.log('here');
        setAddress('')
    }

    const addressCtx = {
        openAddress: address,
        showAddress,
        hideAddress
    }
    return <AddressContext.Provider value={addressCtx}>{children}</AddressContext.Provider>
}

export default AddressContext