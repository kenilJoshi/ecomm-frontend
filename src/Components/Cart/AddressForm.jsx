import React, { useContext, useRef, useState, useEffect } from 'react'
import Modal from '../UI/Modal'
import AddressContext from '../../Context/AddressContext'
import TextField from '@mui/material/TextField';
import UserContext from '../../Context/AuthContext';

function AddressForm() {
  let addressRef = useRef()
  const [addressError, setAddressError] = useState('')
  const addressCtx = useContext(AddressContext)
  const userCtx = useContext(UserContext)

  const handleAddress = () => {
    if(addressRef.current.value !== ''){
      userCtx.addAddress(addressRef.current.value)
      addressCtx.hideAddress()
    }else{
      setAddressError('Required')
    }
  }
  const handleFinish = () => {
    addressCtx.hideAddress()
  }


  return (
    <Modal className='cart' open={addressCtx.openAddress == 'open' ? true : false} onClose={handleFinish}>
      <h2 className='text-lg font-bold'>Add Address</h2>
      <div className='pl-7'>
        <TextField
          className='w-127'
          id="outlined-multiline-static"
          label="Address"
          inputRef={addressRef}
          multiline
          rows={6}
          error={addressError && addressError.length ? true : false}
          helperText={addressError === "" ? '' : addressError}
        />
      </div>
      <div className='flex justify-end pr-8 gap-4'>
        <button onClick={handleFinish}>Close</button>
      <button onClick={handleAddress} className='p-2 m-2 text-center text-white bg-purple-700 hover:bg-purple-800 font-bold text-lg'>Add Address</button>
      </div>
    </Modal>
  )
}

export default AddressForm