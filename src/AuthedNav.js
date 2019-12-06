import React from 'react';
// eslint-disable-next-line
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchBar from "./SearchBar";
import {removeUser} from './store';

class AuthedNav extends React.Component {
    state = {
        dummy: null
    };

    handleLogOut = () => {
        this.props.dispatch(removeUser());
        this.props.history.push("/");
    }
    render() {
        return (
            <div className="container.fluid">
            <nav className="navbar navbar-expand-sm row bg-light" style={{backgroundColor: ""}}>
                <div className="col-sm-3">
                    <NavLink to="/" className="navbar-brand">WeatherApp</NavLink>
                </div>
                
                <div className="col-sm-5">
                    <SearchBar/>
                </div>
                

                 <div className="col-sm-4 rightAlign ">
                    <Link to="/Profile" style={{marginRight: "5px"}}>
                        <button className="btn btn-outline-success">Profile</button>
                    </Link>
                    <button className="btn btn-outline-primary" onClick={this.handleLogOut}>Log Out</button>
                 </div>


                 
            </nav>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(AuthedNav);