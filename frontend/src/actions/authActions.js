import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import jwt_decode from "jwt-decode";

// Register user
export const registerUser = (userData, history) => dispatch => {
    axios.post('api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
};

// Login - get user token
export const loginUser = (userData) => dispatch => {
    axios.post('api/users/login', userData)
        .then(res => {
            const {token} = res.data; // Save to local storage
            localStorage.setItem('jwtToken', token); // Set token to ls
            setAuthToken(token); // Set token to Auth header
            const decoded = jwt_decode(token); // Decode token to get user data
            dispatch(setCurrentUser(decoded)); // Set current user
            })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
};

// Set login user
export const setCurrentUser = decoded => {
    return{
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} whic will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}