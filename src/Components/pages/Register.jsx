import React, { useRef, useState, useEffect, useContext } from 'react'
import TextField from '@mui/material/TextField';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { MuiFileInput } from 'mui-file-input'
import { InputAdornment } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import UserContext from '../../Context/AuthContext';

const emailRegex = new RegExp('^\\w[\\w.-]+@[a-zA-Z\\d.-]+\\.[a-zA-Z]{2,}$');
const passwordRegex = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{5,}$');


function Register() {
    let nameRef = useRef()
    let emailRef = useRef()
    let passwordRef = useRef()
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [imageErrror, setImageError] = useState('')
    const [image, setImage] = useState(null)
    const navigate = useNavigate();
    // const {setUser} = useContext(UserContext)

    useEffect(() => {
        nameRef.current.focus()
        // setUser({name: 'Kenil'})
    }, [])

    const handleChange = (e) => {
        setImage(e)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let userDetail = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            image: image
        }
        if (validateForm(userDetail)) {
            const formData = new FormData();
            formData.append("file", userDetail.image);
            formData.append("upload_preset", 'qktuymhj');
            axios.post("https://api.cloudinary.com/v1_1/dugadzwcv/image/upload", formData).then((res) => {
                let imageInfo = {
                    picture_id: res.data.public_id,
                    secureUrl: res.data.secure_url
                }

                uploadUser({
                    name: userDetail.name,
                    email: userDetail.email,
                    password: userDetail.password,
                    picture_id: imageInfo.picture_id,
                    secureUrl: imageInfo.secureUrl
                })

            }).catch((e) => {
                console.log(e);
            })
        }
    }

    const uploadUser = (user) => {
        axios.post('https://backend-for-ecomm.vercel.app/api/v1/signup', user).then((res) => {
            const data = res.data["user"]
            const token = res.data["token"]
            // setUser({name: data.name, email: data.email})
            localStorage.clear()
            localStorage.setItem('user-token', `Bearer ${token}`)
            toast.success('Registeration Successfull')
            navigate('/')
        }).catch((e) => {
            toast.error('Server error')
        })
    }

    const validateForm = (detail) => {
        if (detail.name == '') {
            setNameError('Field is Empty!')
            return false
        } else {
            setNameError('')
        }
        if (detail.email == '') {
            setEmailError('Field is Empty!')
            return false
        } else {
            setEmailError('')
        }
        if (emailRegex.test(detail.email) == false) {
            setEmailError('Enter valid email')
            return false
        } else {
            setEmailError('')
        }
        if (detail.password == '') {
            setPasswordError('Field is Empty!')
            return false
        } else {
            setPasswordError('')
        }
        // if (passwordRegex.test(detail.password) == false) {
        // //     setPasswordError('Password shoud be atleast 5 character long atleast 1 digit 1 and atleast one alphabate')
        // //     return false
        // // } else {
        // //     setPasswordError('')
        // // }
        if (detail.image == null) {
            setImageError('image should be uploaded')
            return false
        } else {
            setImageError('')
        }
        return true
    }

    return (
        <div className='w-full h-screen flex justify-center items-center bg-gradient-to-r from-violet-300 to-fuchsia-200'>
            <div className="registerForm bg-white rounded shadow-md text-center flex flex-col w-128 gap-7 p-5 pr-12">

                <h1 className='text-5xl font-bold text-left'>Sign Up</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-7 pl-7' encType="multipart/form-data">

                    <TextField
                        id="outlined-multiline-flexible-name"
                        label="Name"
                        maxRows={4}
                        inputRef={nameRef}
                        error={nameError && nameError.length ? true : false}
                        helperText={nameError === "" ? '' : nameError}
                    />
                    <TextField
                        id="outlined-multiline-flexible-email"
                        label="Email"
                        maxRows={4}
                        inputRef={emailRef}
                        error={emailError && emailError.length ? true : false}
                        helperText={emailError === "" ? '' : emailError}
                    />
                    <TextField
                        id="outlined-multiline-flexible-password"
                        label="Password"
                        type='password'
                        maxRows={4}
                        inputRef={passwordRef}
                        error={passwordError && passwordError.length ? true : false}
                        helperText={passwordError === "" ? '' : passwordError}
                    />


                    <MuiFileInput type="file" label="File Upload" InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AttachFileIcon />
                            </InputAdornment>
                        ),
                    }} onChange={handleChange} value={image}
                        error={imageErrror && imageErrror.length ? true : false}
                        helperText={imageErrror === "" ? '' : imageErrror}
                    />
                    <div className='text-right'>
                        <input type="submit" value="Sign Up" className="text-white w-24 bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"></input>
                    </div>
                </form>
                <p className='text-left'>Do you have account? <Link to="/signin" className='text-blue-400'>Sign in</Link></p>
            </div>
            <Toaster />
        </div>
    )
}

export default Register