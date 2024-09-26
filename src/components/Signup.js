import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Signup = (props) => {

  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate()

  const handlesubmit = async (e) => {
    const host = "http://localhost:5000"
    e.preventDefault()
    const { name, email, password } = credentials
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });

    const json = await response.json()
    console.log(json)
    if (json.success) {
      localStorage.setItem('token', json.authtoken)
      navigate("/")
      props.showalert("Account created successfully", "success")
    } else {
      props.showalert("invalid credentials", "danger")
    }
  }


  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="mt-3">
        <h2 className='mb-3'>Create an account to continue to continue</h2>
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Your Name</label>
            <input onChange={onchange} type="text" name='name' className="form-control" id="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input onChange={onchange} type="email" name='email' className="form-control" id="email" aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input onChange={onchange} type="password" name='password' className="form-control" id="password" required minLength={5} />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Password</label>
            <input onChange={onchange} type="password" name='cpassword' className="form-control" id="pcassword" required minLength={5} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}
