import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import Navbar from './Navbar';

export default function Landing() {
    const [cookies] = useCookies(["cookie-name"]);
    const navigate = useNavigate();
    useEffect(() => {
        if (cookies.user) {
            navigate("/dashboard");
        }
    }, [cookies, navigate]);
    return (
        <React.Fragment>
            <Navbar />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "75vh" }} className="container">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            Welcome to the <b>IIT Bombay</b> Kendriya Vidyalaya
                        </h4>
                        <p className="flow-text grey-text text-darken-1">
                            Login to start learning!
                        </p>
                        <div align="center" className="col s12" style={{ paddingLeft: "11.250px", marginBottom: "10px" }}>
                            <Link to='/login' style={{ color: "#004ea0", textDecoration: "none" }}>
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
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
