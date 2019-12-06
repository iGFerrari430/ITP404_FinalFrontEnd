import React from 'react';
// eslint-disable-next-line
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import SearchBar from "./SearchBar"

export default class InNav extends React.Component {
    state = {
        dummy: null
    };

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
                    <Link to="/auth"><button className="btn btn-outline-primary">Sign up Or Log In</button></Link>
                 </div>


                 
            </nav>
            </div>
        );
    }
}