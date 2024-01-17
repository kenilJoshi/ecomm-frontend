import React, { useRef, useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
    const emailRef = useRef()
    const [emailError, setEmailError] = useState('')

    useEffect(()=>{
        emailRef.current.focus()
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()

        let email = emailRef.current.value

        if(validateForm(email)){
            axios.post('http://localhost:3000/api/v1/forgetPassword', {email}).then((res) => {
                toast.success("Email Sent")
            }).catch((e) => {
                toast.error('Server error')
            })
        }

    }

    const validateForm = (email) => {
        if(email== ''){
            setEmailError('Email is empty')
            return false
        }else{
            setEmailError('')
        }
        return true
    }


    return (
        <div className='w-full h-screen flex justify-center items-center bg-gradient-to-r from-violet-300 to-fuchsia-200'>
            <div className="registerForm bg-white rounded shadow-md text-center flex flex-col w-128 gap-7 p-5 pr-12">

                <h1 className='text-5xl font-bold text-left'>Sign In</h1>
                <p className='text-left'>Reset password email will be sent</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-7 pl-7' encType="multipart/form-data">
                    <div className='emailInput'>
                        <TextField
                            id="outlined-multiline-flexible-email"
                            label="Email"
                            className='w-full'
                            maxRows={4}
                            inputRef={emailRef}
                            error={emailError && emailError.length ? true : false}
                            helperText={emailError === "" ? '' : emailError}
                        />
                    </div>
                    <div className='text-right'>
                        <input type="submit" value="Send Email" className="text-white w-28 bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"></input>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    )
}

export default ForgotPassword