import {AUTH} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        // register the user
        const {data} = await api.signup(formData);
        dispatch({type: AUTH, data});
        const uniqueId= JSON.parse(localStorage.getItem('profile')).result._id;
        localStorage.setItem('currentUserUniqueId', uniqueId);
        navigate('/Home');
    } catch (error) {
        console.log(error);
    }
}

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const {data} = await api.signin(formData);
        dispatch({type: AUTH, data});
        const uniqueId= JSON.parse(localStorage.getItem('profile')).result._id;
        localStorage.setItem('currentUserUniqueId', uniqueId);
        navigate('/Home');
    } catch (error) {
        console.log(error);
    }
}

export const sendEmail = (emailData) => async (dispatch) => {
    try {
        console.log(emailData);
        const {data} = await api.sendEmail(emailData);
    } catch (error) {
        console.log(error);
    }
}