import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "@testing-library/jest-dom/extend-expect";
import Landing from './Landing'
import {render} from "@testing-library/react";
import Auth from './Auth'
import configureStore from 'redux-mock-store' //ES6 modules
import SearchBar from './SearchBar'
import AuthedNav from './AuthedNav'
import UnAuthedNav from './UnAuthedNav'
import {Provider} from 'react-redux';
import Profile from './Profile'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SearchResult from './SearchResult'
import CityPage from './CityPage'
it('renders App without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("test rendering of App", () => {
  const {container} = render(<App />);

  expect(container).toHaveTextContent("Sign up Or Log In")
})

it('renders main landing page', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Landing />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("test rendering of main page", () => {
  const {container} = render(<Landing />);

  expect(container).toHaveTextContent("Welcome to WeatherAppThis app aims to provide you with a quick tool to look up live weather information from around the world. Here are some tips to navigate through this application:use the searchBar correctly. you should ALWAYS make the first letter of every word of the city city capitalized.for example: Los Angeles, San Francisco, SeattleWe will display all cities with the name you searched in a standalone page. Use country location and lat/long to identify the city you desire.Once logged in, In the profile page, you can view and revisit your search history, clear search history and change password.We sincerely hope you can use this as a daily convenient tool. Enjoy!")
})

it("test rendering of auth page", () => {

  const middlewares = []
  const mockStore = configureStore(middlewares)
  const initialState = {}
  const store = mockStore(initialState)

  const auth = {
    isLoggedin: false,
    user: null
  }
  
  const div = document.createElement('div');
  ReactDOM.render(<Auth auth={auth} store={store} />, div);
  ReactDOM.unmountComponentAtNode(div);

})

it("test displaying auth page", () => {

  const middlewares = []
  const mockStore = configureStore(middlewares)
  const initialState = {}
  const store = mockStore(initialState)

  const auth = {
    isLoggedin: false,
    user: null
  }
  
  const {container} = render(<Auth auth={auth} store={store} />);
  expect(container).toHaveTextContent("Logging inEmail addressWe'll never share your email with anyone else.PasswordlogIn Or signUp")

})

it("test displaying searchbar w/o problem", () => {

  const middlewares = []
  const mockStore = configureStore(middlewares)
  const initialState = {}
  const store = mockStore(initialState)

  const auth = {
    isLoggedin: false,
    user: null
  }
  
  const div = document.createElement('div');
  ReactDOM.render(<Router>
    <SearchBar auth={auth} store={store} />
    </Router>, div);
  ReactDOM.unmountComponentAtNode(div);

})

it("test rendering search bar", () => {

  const middlewares = []
  const mockStore = configureStore(middlewares)
  const initialState = {}
  const store = mockStore(initialState)

  const auth = {
    isLoggedin: false,
    user: null
  }
  
  const {container} = render(<Router>
    <SearchBar auth={auth} store={store} />
    </Router>);
  expect(container).toHaveTextContent("Search City")

})

it("test rendering of Authed Navbar", () => {

  const middlewares = []
  const mockStore = configureStore(middlewares)
  const initialState = {}
  const store = mockStore(initialState)

  const auth = {
    isLoggedin: false,
    user: null
  }
  
  const div = document.createElement('div');
  const {container} = render(
    <Provider store={store}>
      <Router><AuthedNav auth={auth} store={store} /></Router>
    </Provider>, div);
  expect(container).toHaveTextContent("WeatherAppSearch CityProfileLog Out")

})

it("test rendering of UnAuthed Navbar", () => {

  const middlewares = []
  const mockStore = configureStore(middlewares)
  const initialState = {}
  const store = mockStore(initialState)

  const auth = {
    isLoggedin: false,
    user: null
  }
  
  const div = document.createElement('div');
  const {container} = render(
    <Provider store={store}>
      <Router><UnAuthedNav auth={auth} store={store} /></Router>
    </Provider>, div);
  expect(container).toHaveTextContent("WeatherAppSearch CitySign up Or Log In")

})

it("test displaying unauthed navbar without problem", () => {

  const middlewares = []
  const mockStore = configureStore(middlewares)
  const initialState = {}
  const store = mockStore(initialState)

  const auth = {
    isLoggedin: false,
    user: null
  }
  
  const div = document.createElement('div');
  ReactDOM.render( <Provider store={store}>
    <Router><UnAuthedNav auth={auth} store={store} /></Router>
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);



})

it("test rendering City", () => {

  const middlewares = []
  const mockStore = configureStore(middlewares)
  const initialState = {}
  const store = mockStore(initialState)

  const auth = {
    isLoggedin: false,
    user: null
  }
  
  const div = document.createElement('div');
  const {container} = render(
    <Provider store={store}>
      <Router><CityPage auth={auth} store={store} match={{params: {cityId: "123"}}}/></Router>
    </Provider>, div);
  expect(container).toHaveTextContent("Loading Result..")

})

it("test displaying City w/o problem", () => {

  const middlewares = []
  const mockStore = configureStore(middlewares)
  const initialState = {}
  const store = mockStore(initialState)

  const auth = {
    isLoggedin: false,
    user: null
  }
  

  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}>
    <Router><CityPage auth={auth} store={store} match={{params: {cityId: "123"}}}/></Router>
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);

})



it("test rendering SearchResult", () => {

  const middlewares = []
  const mockStore = configureStore(middlewares)
  const initialState = {}
  const store = mockStore(initialState)

  const auth = {
    isLoggedin: false,
    user: null
  }
  
  const div = document.createElement('div');
  const {container} = render(
    <Provider store={store}>
      <Router><SearchResult auth={auth} store={store} match={{params: {cityId: "123"}}}/></Router>
    </Provider>, div);
  expect(container).toHaveTextContent("Search Result#CityCountryLocation")

})

it("test displaying SearchResult w/o problem", () => {

  const middlewares = []
  const mockStore = configureStore(middlewares)
  const initialState = {}
  const store = mockStore(initialState)

  const auth = {
    isLoggedin: false,
    user: null
  }
  
  const div = document.createElement('div');

  ReactDOM.render(<Provider store={store}>
    <Router><SearchResult auth={auth} store={store} match={{params: {cityId: "123"}}}/></Router>
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
})