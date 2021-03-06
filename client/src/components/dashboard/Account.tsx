import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import { getUser } from '../../actions/accountActions';
import { connect } from "react-redux";
import Media from 'react-media';
import Avatar from '@material-ui/core/Avatar';
import { IAuthProp, IUserProp } from "../../common/interfaces";
import { AppState } from "../../reducers";

// Props
interface IAccountProps {

    user: IUserProp,
    auth: IAuthProp,
    match: any,
    getUser: (id: string) => any,
    logoutUser: () => any
    
}

class Account extends Component<IAccountProps> {

    componentDidMount() {

        this.props.getUser(this.props.match.params._id);

    }

    onLogoutClick = (e: any) => {

        e.preventDefault();

        this.props.logoutUser();

    }

    render() {

        return (
            <div className="container" style={{ minHeight: "70vh", marginTop: "130px" }}>
                <div style={{ marginTop: "4rem" }} className="row">
                    <div className="col s11 offset-s1">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to
                            home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                Your <b>account</b> 
                            </h4>
                            <p className="grey-text text-darken-1">                
                            Manage your data and connect / disconnect Strava Account
                            </p>
                        </div>
                    </div>
                    <Media query="(max-width: 690px)">
                    {matches =>
                        matches ? 
                        (<div className="col s12" style={{marginTop: "20px"}}>                        
                            <div className="bordered">                                                      
                                <Avatar style={{width: "50px", height: "50px", fontSize:"25px"}} className="avatar">{this.props.auth.user.name.substr(0, 1)}</Avatar>
                                <h3 className="lineMobile">{this.props.user.users.name}</h3> 
                                <br/><br/><hr/><br/>
                                <h6><i className="propName">EMAIL:</i> {this.props.user.users.email}</h6><br/>
                                <h6><i className="propName">DATE OF REGISTRATION:</i> {this.props.user.users.date}</h6><br/>
                                <h6><i className="propName">ID:</i> {this.props.user.users._id}</h6><br/>
                                <div className="centered">
                                    <button
                                        style={{
                                            width: "auto",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            marginBottom: "20px"
                                        }}
                                        onClick={this.onLogoutClick}
                                        className="btn btn-large waves-effect waves-light hoverable red accent-3"
                                        >Logout
                                    </button> 
                                </div> 
                                <div className="centered">                    
                                    {!(this.props.user.users.stravaUserID === "") ? 
                                        <Link to="/disconnectStrava"
                                        style={{
                                            width: "auto",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px"
                                        }}
                                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                        >Discon. Strava
                                        </Link>
                                        :
                                        <a href={`http://www.strava.com/oauth/authorize?client_id=37519&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=read`}
                                            style={{
                                                width: "auto",
                                                borderRadius: "3px",
                                                letterSpacing: "1.5px"
                                            }}
                                            className="btn btn-large waves-effect waves-light hoverable green accent-3"
                                            >Connect Strava
                                        </a>                        
                                    }  
                                </div>                                
                            </div>
                        </div>                        
                        ) 
                        : 
                        (<div className="col s12" style={{marginTop: "20px"}}>                        
                            <div className="bordered">                                                      
                                <Avatar style={{width: "60px", height: "60px", fontSize:"30px"}} className="avatar">{this.props.auth.user.name.substr(0, 1)}</Avatar>
                                <h3 className="line">{this.props.user.users.name}</h3> 
                                <br/><hr/><br/>
                                <h6><i className="propName">EMAIL:</i> {this.props.user.users.email}</h6><br/>
                                <h6><i className="propName">DATE OF REGISTRATION:</i> {this.props.user.users.date}</h6><br/>
                                <h6><i className="propName">ID:</i> {this.props.user.users._id}</h6><br/>
                                <button
                                    style={{
                                        width: "auto",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "-135px",
                                        float: "right"                                    
                                    }}
                                    onClick={this.onLogoutClick}
                                    className="btn btn-large waves-effect waves-light hoverable red accent-3"
                                    >Logout
                                </button>                            
                                {!(this.props.user.users.stravaUserID === "") ? 
                                    <Link to="/disconnectStrava"
                                        style={{
                                            width: "auto",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",                                    
                                            marginTop: "-60px",
                                            float: "right"                                    
                                        }}
                                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                        >Disconnect Strava
                                    </Link>
                                    :
                                    <a href={`http://www.strava.com/oauth/authorize?client_id=37519&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=read`}
                                        style={{
                                            width: "auto",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            marginTop: "-60px",
                                            float: "right"                                    
                                        }}
                                        className="btn btn-large waves-effect waves-light hoverable green accent-3"
                                        >Connect Strava
                                    </a>                        
                                }  
                            </div>
                        </div>
                        )
                    }
                    </Media>                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    auth: state.auth,
    user: state.user
})

export default connect(mapStateToProps, { logoutUser, getUser })(Account);