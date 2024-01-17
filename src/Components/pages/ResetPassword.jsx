import React, {useRef, useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

function ResetPassword() {
    const param = useParams()
    const navigate = useNavigate()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')    

    useEffect(() => {
        passwordRef.current.focus()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        let password = passwordRef.current.value
        let confirmPassword = confirmPasswordRef.current.value
        
        if(validateForm({password, confirmPassword})){
            axios.post(`http://localhost:3000/api/v1/reset/${param.id}`,{password}).then((res) => {
                if(res){
                    toast.success('The Password has been changed')
                    navigate('/signin')
                }
            }).catch((e) => {
                toast.error(e.response["data"])
            })
        }
    }

    const validateForm = (passwords) => {
        if(passwords.password == ''){
            setPasswordError("password shouldn't be empty")
            return false
        }else{
            setPasswordError('')
        }
        if(passwords.confirmPassword == ''){
            setConfirmPasswordError("password shouldn't be empty")
            return false
        }else{
            setConfirmPasswordError('')
        }
        if(passwords.password !== passwords.confirmPassword){
            setPasswordError('Password should match')
            setConfirmPasswordError("Password should match")
            return false
        }else{
            setPasswordError('')
            setConfirmPasswordError("")
        }
        return true
    }

  return (
    <div className='w-full h-screen flex justify-center items-center bg-gradient-to-r from-violet-300 to-fuchsia-200'>
            <div className="registerForm bg-white rounded shadow-md text-center flex flex-col w-128 gap-7 p-5 pr-12">

                <h1 className='text-5xl font-bold text-left'>Reset Password</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-7 pl-7' encType="multipart/form-data">
                <div className='passwordInput'>
                        <TextField
                            id="outlined-multiline-flexible-password"
                            label="Password"
                            type='password'
                            className='w-full'
                            maxRows={4}
                            inputRef={passwordRef}
                            error={passwordError && passwordError.length ? true : false}
                            helperText={passwordError === "" ? '' : passwordError}
                        />
                    </div>
                    <div className='confirmPassword'>
                        <TextField
                            id="outlined-multiline-flexible-confirmPassword"
                            label="Confirm Password"
                            type='password'
                            className='w-full'
                            maxRows={4}
                            inputRef={confirmPasswordRef}
                            error={confirmPasswordError && confirmPasswordError.length ? true : false}
                            helperText={confirmPasswordError === "" ? '' : confirmPasswordError}
                        />
                    </div>
                    <div className='text-right'>
                        <input type="submit" value="Reset Password" className="text-white w-36 bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"></input>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
  )
}

export default ResetPassword