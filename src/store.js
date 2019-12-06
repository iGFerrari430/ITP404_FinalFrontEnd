import { createStore,combineReducers } from "redux";
import axios from 'axios';
const defaultState = {
    isLoggedin: false,
    user: null
}


export const setUser = currUser => {
    return {
        type: "SET_USER",
        user: currUser
    }
};
export const loginUser = async(body,dispatch) => {
    try {
        const res = await axios.post("https://lit-refuge-97535.herokuapp.com/authUser",body);
        dispatch(setUser(body));

        return "SUCCESS";
    }catch(err) {
        return "FAILURE";
    }
}
export const removeUser = () => {
    return {
        type: "REMOVE_USER"
    }
}

const authReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "SET_USER":
                return {
                    ...state,
                    isLoggedin: true,
                    user: action.user
                };
            case "REMOVE_USER": 
                return {
                    ...state,
                    isLoggedin: false,
                    user: null
                }
            default: 
                return state;
    }
}
export default () => {
    let store = createStore(combineReducers({
        auth: authReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    return store;
}