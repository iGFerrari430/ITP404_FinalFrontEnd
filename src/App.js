import React from 'react';
import { BrowserRouter,Route, Switch, Link, NavLink } from 'react-router-dom'; 
import './App.css';
import SearchResult from './SearchResult'
import AuthedNav from './AuthedNav';
import UnAuthedNav from './UnAuthedNav';
import Landing from './Landing'
import Auth from './Auth'
import 'bootstrap/dist/css/bootstrap.min.css';
import getStore from './store';
import {Provider} from 'react-redux';
import CityPage from './CityPage';
import Profile from './Profile'
import Container from 'react-bootstrap/Container'
import { Helmet } from 'react-helmet'
const store = getStore();

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      dummy: false,
      isLoggedIn: false
    }

    store.subscribe(() => {
      this.setState(() => ({
          isLoggedIn: store.getState().auth.isLoggedin
      }))
    });
  }

  componentDidMount() {

  }

  render(){
    return (
      <div className="AppClass">
        <Helmet>
          <title>WeatherApp Main Page</title>
        </Helmet>
        <Provider store={store}>
          <BrowserRouter>
            <Route
            path="/"
            component={
              this.state.isLoggedIn ? AuthedNav : UnAuthedNav
            }
            />
            <Switch>
              <Route exact path="/auth" component={Auth} />
              <Route exact path="/" component={Landing} />
              <Route exact path="/searchResult/:cityName" component={SearchResult} />
              <Route exact path="/searchId/:cityId/:cityName" component={CityPage} />
              <Route exact path = "/profile" component={Profile} />
              <Route component={PageNotFound}/>
            </Switch>
          </BrowserRouter>
        </Provider>
      </div>
    )
  }

}

class PageNotFound extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
    return (
      <Container style={{textAlign: "center", marginTop: "30px"}}>
        <h2>404 -- URL Incorrect</h2>
      </Container>
    )
  }
}
