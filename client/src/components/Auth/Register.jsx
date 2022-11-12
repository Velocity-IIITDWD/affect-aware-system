import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Navbar from './Navbar';
import { useCookies } from 'react-cookie';

export default function Register() {
    const [cookies] = useCookies([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (cookies.user) {
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
                "http://localhost:2000/api/auth/register",
                {
                    ...values,
                },
                { withCredentials: true }
            );
            console.log(data);
            if (data) {
                if (data.errors) {
                    const { username, password } = data.errors;
                    if (username) generateError(username);
                    else if (password) generateError(password);
                } else {
                    navigate("/login");
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
                                <b>Register</b>
                            </h4>
                        </div>
                        <form style={{ display: "block" }} onSubmit={(e) => handleSubmit(e)}>
                            <div align="center" className="input-field col s6 offset-s3">
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                />
                            </div>
                            <div align="center" className="input-field col s6 offset-s3">
                                <input
                                    name="password"
                                    type="password"
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
                                    Register
                                </button>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <span>
                                    Already have an account? <Link to='/login' style={{ color: "#004ea0", textDecoration: "none" }}>Login</Link>
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