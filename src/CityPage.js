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
import { Helmet } from 'react-helmet'
class CityPage extends React.Component {
    state = {
        dummy: null,
        uploading: true,
        detail: null
    };

    async componentDidMount() {
       // <Route exact path="/searchId/:cityId" copmonent={CityPage} />
        const cityName = this.props.match.params.cityId;
        let url = `https://lit-refuge-97535.herokuapp.com/searchId/${cityName}`;
        let res = null;
        try{
            res = await axios.get(url);
            await this.setState({
                detail: res.data,
                uploading: false
            })
        }catch(err){

        }
    }

    render() {
        if (this.state.uploading){
            return (
                <Container style={{
                    marginTop: "25px",
                    textAlign: "center"
                }}>

                    <Helmet>
                        <title>City Page</title>
                    </Helmet>
                    <h1>Loading Result..</h1>
                </Container>
            )
        }

        const detail = this.state.detail;
        return (
            <Container style={{
                marginTop: "25px",
                textAlign: "center"
            }}>
                <Helmet>
                    <title>City Page</title>
                </Helmet>
                <h1>{this.props.match.params.cityName}</h1>

                <Table style={{marginTop:"20px"}} striped bordered hover>
                    
                    <tbody>
                        <tr>
                            <td>Temperature</td>
                            <td>{`${detail.main.temp} °C`}</td>
                        </tr>

                        <tr>
                            <td>Wind Speed</td>
                            <td>{`${detail.wind.speed} m/s`}</td>
                        </tr>
                            
                        <tr>
                            <td>Cloudiness</td>
                            <td>{`${detail.clouds.all}%`}</td>
                        </tr>

                        <tr>
                            <td>Pressure</td>
                            <td>{`${detail.main.pressure} MPa`}</td>
                        </tr>

                        <tr>
                            <td>Humidity</td>
                            <td>{`${detail.main.humidity}%`}</td>
                        </tr>

                        <tr>
                            <td>Visibility</td>
                            <td>{`${detail.visibility}m`}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        );
    }


}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(CityPage);