import React, { useState } from 'react'
import axios from 'axios'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


const handleSubmit = async (e) => { 
    e.preventDefault()
    let sendData = { 
        email: email,
        password: password
    }
    const res = await axios.post('http://localhost:5000/api/users/login', sendData);

    console.log(res)
}
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <label>email: 
            <input
            onChange={(e) => setEmail(e.target.value)}
            type='text'/>
        </label>
        <label>password: 
            <input 
             onChange={e => setPassword(e.target.value)}
            type='text'/>
        </label>
        <button type='submit'>signIn</button>
        </form>
    </div>
  )
}

export default Login