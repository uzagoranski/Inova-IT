import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navigation extends Component {

    render() {
        
        return (            
            <div className="navbar">
                <nav className="z-depth-0">
                    <div className="nav-wrapper white">
                        <Link
                        to="/"
                        style={{
                            fontFamily: "monospace"
                        }}
                        className="col s12 brand-logo center black-text"
                        >
                        <i className="material-icons">code</i>
                        Inova IT competition platform
                        </Link>           
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navigation;