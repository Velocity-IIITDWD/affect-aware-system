import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/et-logo.jpeg';

export default function Navbar() {
    return (
        <div className="navbar-fixed">
            <nav className="z-depth-0">
                <div className="nav-wrapper white">
                    <Link
                        to="/"
                        style={{
                            fontFamily: "Lato",
                            color: "black",
                            textDecoration: "none",
                        }}
                        className="col s5 brand-logo center black-text"
                    >
                        <div className="navbar-content" style={{ paddingTop: 10, display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <img className="navbar-logo" src={logo} alt="logo" style={{width: 90, maxWidth: 90}}/>
                                <h3 style={{display: "inline-block", paddingLeft: 10}}>Pekanu</h3>
                                <h3 style={{color: "#004ea0", paddingLeft: 7, display: "inline-block"}}>e</h3>
                                <h3 style={{display: "inline-block"}}>Tutor</h3>
                            </div>
                    </Link>
                </div>
            </nav>
        </div>
    );
}