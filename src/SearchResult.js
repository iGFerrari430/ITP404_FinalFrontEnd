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
class SearchResult extends React.Component {
    state = {
        dummy: null,
        uploading: true,
        list: []
    };

    async componentDidMount() {
        const cityName = this.props.match.params.cityName;
        let url = `https://lit-refuge-97535.herokuapp.com/searchCity/${cityName}`;
        let res = null;
        try{
            res = await axios.get(url);
            this.setState({
                list: res.data
            })
        }catch(err){

        }
    }
    async componentDidUpdate(prevProps) {
        if (this.props.match.params.cityName != prevProps.match.params.cityName) {
            this.setState({
                uploading: true
            })
            const cityName = this.props.match.params.cityName;
            let url = `https://lit-refuge-97535.herokuapp.com/searchCity/${cityName}`;
            let res = null;
            try{
                res = await axios.get(url);
                this.setState({
                    list: res.data
                })
            }catch(err){
    
            }
        }
    }
    render() {
        return (
            <Container style={{
                textAlign: "center"
            }}>
                <Helmet>
                    <title>Search Result</title>
                </Helmet>
                <h1 style={{marginTop: "20px"}}>Search Result</h1>
                <Table style={{marginTop:"20px"}} striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>Location</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.list.map((city,index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>
                                    <Link to={'/searchId/'+city.id+'/'+city.name}>
                                        {city.name}
                                    </Link>
                                        
                                    
                                    </td>
                                    <td>{city.country}</td>
                                    <td>{`{${city.coord.lon},${city.coord.lat}}`}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>
        );
    }


}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(SearchResult);