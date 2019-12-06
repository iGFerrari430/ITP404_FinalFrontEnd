import React from 'react';
// eslint-disable-next-line
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchBar from "./SearchBar";
import {removeUser} from './store';
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Jumbotron from 'react-bootstrap/Jumbotron'
export default class Landing extends React.Component {
    state = {
        dummy: null
    };

    render() {
        return (
            <Container>
                <Jumbotron style={{marginLeft: "100px", marginRight: "100px", marginTop: "40px"}}>
                    <h1>Welcome to WeatherApp</h1>
                    <p>This app aims to provide you with a quick tool to look up live weather information from around the world.
                    Here are some tips to navigate through this application:
                    </p>
                    <ul>
                        <li>use the searchBar correctly. you should ALWAYS make the first letter of every word of the city city capitalized.
                        <strong>for example: Los Angeles, San Francisco, Seattle</strong></li>
                        <li>We will display all cities with the name you searched in a standalone page. Use country location and lat/long to identify
                        the city you desire.</li>
                        <li>Once logged in, In the profile page, you can view and revisit your search history, clear search history and change password.</li>
                        <li>We sincerely hope you can use this as a daily convenient tool. Enjoy!</li>
                    </ul>
                </Jumbotron>
            </Container>
        );
    }
}