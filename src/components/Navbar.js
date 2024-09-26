import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Link,
    useLocation,
    Navigate,
    useNavigate
} from "react-router-dom";



export const Navbar = () => {
    let Navigate = useNavigate()

    const logout = ()=>{
        localStorage.removeItem('token')
        Navigate('/login')
    }
    const location = useLocation();
    return (
        <>
            <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                       {!localStorage.getItem('token')? <form className="d-flex" role="search">
                               <Link role='button' to="/login" className="btn btn-outline-secondary mx-2 text-light" type="submit">Login</Link>
                               <Link role='button' to="/signup" className="btn btn-outline-secondary mx-2 text-light" type="submit">Signup</Link>
                        </form>: <button onClick={logout} className='btn btn-secondary'>Logout</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}
