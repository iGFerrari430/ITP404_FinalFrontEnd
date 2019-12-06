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
import { Helmet } from 'react-helmet'
class Profile extends React.Component {
    state = {
        dummy: null,
        uploading: true,
        list: [],
        inputValue: ""
    };

    async componentDidMount() {
        if (!this.props.auth.user){
            return;
        }
        const username = this.props.auth.user.username;

        //app.get("/getHistory/:userName"
        const res = await axios.get("https://lit-refuge-97535.herokuapp.com/userProfile/"+username);
        console.log(res);
        await this.setState({
            list: res.data.history,
            uploading: false
        })

        console.log(this.state);
    }
    handleClear = async() => {
        axios.delete("https://lit-refuge-97535.herokuapp.com/deleteHistory/"+this.props.auth.user.username);
        this.setState({
            list: []
        })
    }
    handleChange = (e) => {
        const val = e.target.value;
        this.setState(() => ({
            inputValue: val
        }))
    }

    handlePassword = () => {
        const pw = this.state.inputValue.trim();
        ///changePassword
        axios.put("https://lit-refuge-97535.herokuapp.com/changePassword",{
            username: this.props.auth.user.username,
            password: pw
        })
        this.setState({
            inputValue: ""
        })
        alert("Your New Password Has Been Set!")
    }
    render() {
        
        if (this.state.uploading){
            return (
                <Container style={{textAlign: "center",marginTop: "20px"}}>
                    <Helmet>
                        <title>Profile Page</title>
                    </Helmet>
                    <h1>loading...</h1>
                </Container>
            )
        }
        return (
            <Container style={{textAlign: "center",marginTop: "20px"}}>
                <Helmet>
                    <title>Profile Page</title>
                </Helmet>
                <h1 style={{marginBottom: "20px"}}>Search History</h1>
                <Table style={{marginTop:"20px"}} striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>City</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.list.map((city,index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>
                                        <Link to={'/searchResult/'+city.content}>
                                            {city.content}
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <Button variant="outline-warning" size="lg" block onClick={this.handleClear}>
                    Clear Search History
                </Button>
                <InputGroup className="mb-3" style={{marginTop: "15px"}}>
                <FormControl
                  placeholder="New Password"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={this.state.inputValue}
                  onChange={this.handleChange}
                />
                <InputGroup.Append>
                  <Button variant="outline-secondary" onClick={this.handlePassword}>Change Password</Button>
                </InputGroup.Append>
              </InputGroup>
            </Container>
        );
    }




}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Profile);
