import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export const Login = (props) => {

    const [credentials, setcredentials] = useState({ email: "", password: "" })
    let navigate =  useNavigate()

    const handlesubmit = async (e) => {
        const host = "http://localhost:5000"
        e.preventDefault()
        const response = await fetch(`${    host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json()
        console.log(json)
        if(json.success){
            localStorage.setItem('token' , json.authtoken)
            navigate("/")
            props.showalert("Logged In successfully" , "success")
        }else{
            props.showalert("Invalid Credentials" , "danger")
        }
    }

    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
        <div className="mt-3">

        <h2 className='mb-3'>Please Login to continue</h2>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name='email' className="form-control" value={credentials.email} onChange={onchange} id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" value={credentials.password} onChange={onchange} id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
        </>
    )
}
