import React from 'react'
import {loginUser} from "./store"
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { useAlert,withAlert} from 'react-alert'
import Alert from 'react-bootstrap/Alert'
import { Helmet } from 'react-helmet'
class Auth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            emailMsg: '',
            passwordMsg: '',
            isSubmitting: false
        }
    }

    onEmailChange = e => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    }

    onpasswordChange = e => {
        const password = e.target.value;
        this.setState(() => ({ password }));
    }

    ValidateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    onSubmit = async e => {
        e.preventDefault();
        await this.setState({
            emailMsg: "",
            passwordMsg: ""
        });
        let {email,password} = this.state;
        email = email.trim();
        password = password.trim().toString();
        if (!this.ValidateEmail(email)){
            await this.setState({
                emailMsg: "this is not an email."
            })
            return;
        }
        if (password.length < 6){
            await this.setState({
                passwordMsg: "Password should be greater/equal to 6."
            })
            return;
        }
        const body = {
            username: email,
            password: password
        };
        try{
            await this.setState({
                isSubmitting: true
            })

            const loginMsg = await loginUser(body,this.props.dispatch);
            if (loginMsg === "SUCCESS"){
                
                this.props.history.push("/");
            }else{
                this.setState(() => ({
                    isSubmitting: false,
                    passwordMsg: "Password Incorrect."
                }))
            }
        }catch(err) {

        }
    }
    render() {
        return (
            <div className="container center_div">
                <Helmet>
                    <title>Log In/Sign Up Page</title>
                </Helmet>
                <div className="col-md-8 row">
                    <div className="col-0"></div>
                    <div className="col-12">
                    <h1 className="AuthTitle">Logging in</h1>
                    <form onSubmit={this.onSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input 
                                    type="text" 
                                    className="form-control " 
                                    value={this.state.email}
                                    onChange={this.onEmailChange}
                                    id="exampleInputEmail1" 
                                    aria-describedby="emailHelp" 
                                    placeholder="Enter email"
                                     required/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        {
                            this.state.emailMsg && 
                            <Alert variant="danger">
                                {this.state.emailMsg}
                            </Alert>
                        }
                        <div className="form-group">
                            <label htmlFor="Password1">Password</label>
                            <input type="password" 
                            className="form-control " 
                            id="Password1" 
                            value={this.state.password}
                            onChange={this.onpasswordChange}
                            placeholder="Password" 
                            required/>
                        </div>
                        {
                            this.state.passwordMsg && <div className="alert alert-warning" role="alert">
                                {this.state.passwordMsg}
                            </div>
                        }

                        <button onSubmit={this.onSubmit} className="btn btn-primary" disabled={this.state.isSubmitting}>
                            {this.state.isSubmitting ? "Authorizing You..." : "logIn Or signUp"}
                        </button>
                    </form>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(Auth);