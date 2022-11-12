import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useCookies } from "react-cookie";
import axios from "axios";
import Navbar from './Navbar';
import Logger from '../../store/clickstreamLogger'

export default function Login() {
    const [cookies] = useCookies([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (cookies.user) {
            console.log(cookies.session, cookies.user._id,cookies.user.username, "PageQuery: Clicked on Login", "Navigated from Login Page to Home Page")
            Logger(cookies.session, cookies.user._id,cookies.user.username, "PageQuery: Clicked on Login", "User Logged In")
            navigate("/dashboard");
        }
    }, [cookies, navigate]);

    const [values, setValues] = useState({ username: "", password: "" });

    const generateError = (error) =>
        toast.error(error, {
            position: "bottom-right",
        });
        
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:2000/api/auth/login",
                {
                    ...values,
                },
                { withCredentials: true }
            );
            if (data) {
                console.log(data);
                if (data.errors) {
                    const { username, password } = data.errors;
                    if (username) generateError(username);
                    else if (password) generateError(password);
                } else {
                    Logger("Session Started", data.user._id,data.user.username, "PageQuery: Clicked on Login", "User Logged In")
                    navigate("/dashboard");
                }
            }
        } catch (ex) {
            console.log(ex);
        }
    };

    return (
    <React.Fragment>
        <Navbar />
        <div className='container' align="center">
            <div style={{ marginTop: "4rem" }} align="center" className="row">
                <div className="col s8" align="center" style={{ paddingTop: "50px" }}>
                    <div className="col s12">
                        <h4>
                            <b>Login</b>
                        </h4>
                    </div>
                    <form noValidate style={{ display: "block" }} onSubmit={(e) => handleSubmit(e)}>
                        <div align="center" className="input-field col s6 offset-s3">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                className="username"
                                placeholder="Username"
                                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div align="center" className="input-field col s6 offset-s3">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="password"
                                placeholder="Password"
                                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div align="center" className="col s12" style={{ paddingLeft: "11.250px", marginBottom: "10px" }}>
                            <button
                                align="center"
                                style={{
                                    width: "150px",
                                    maxWidth: "150px",
                                    backgroundColor: "#004ea0",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem",
                                    color: "white"
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light hoverable"
                            >
                                Login
                            </button>
                        </div>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <span>
                                Don't have an account? <Link to='/register' style={{ color: "#004ea0", textDecoration: "none" }}>Register</Link>
                            </span>
                        </div>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    </React.Fragment>
    )
}