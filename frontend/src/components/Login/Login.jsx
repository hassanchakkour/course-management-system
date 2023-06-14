import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useLoginMutation } from '../../slices/usersApiSlice'
import { setCredentials } from '../../slices/authSlice'
import {toast} from 'react-toastify'
import axios from 'axios'


const Login = () => {


    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    const {userInfo} = useSelector((state) => state.auth);

    useEffect(() => { 
        if(userInfo){ 
            console.log('navigate')
        }
    }, [userInfo])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


const handleSubmit = async (e) => { 
    e.preventDefault()
    try{ 
        const res = await login({
            email, 
            password
        }).unwrap();
        dispatch(setCredentials({...res}))
        console.log('navigate to home')
    }catch(error){ 
        toast.error(error?.data.message || error.error)
    }
    // let sendData = { 
    //     email: email,
    //     password: password
    // }
    // const res = await axios.post('http://localhost:5000/api/users/login', sendData);

    // console.log(res)
}
  return (
    <div className='my-16 mx-[30%]'>
        <form onSubmit={handleSubmit}>
        <label>email: 
            <input
            onChange={(e) => setEmail(e.target.value)}
            className='border ml-10'
            type='text'/>
        </label><br /><br />
        <label>password: 
            <input 
             onChange={e => setPassword(e.target.value)}
             className='border ml-3'
            type='text'/>
        </label><br /><br />
        <button className='border p-2 ml-[20%]' type='submit'>signIn</button>
        </form>
    </div>
  )
}

export default Login