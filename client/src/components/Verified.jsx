import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {verifyAccount} from "../actions/auth";

function Verified(){
    const {email, verificationToken} = useParams();
    const dispatch = useDispatch();
    dispatch(verifyAccount(email, verificationToken));
    return(<h1>Your account with email: {" "+email+" "} has been verified!</h1>);
};

export default Verified;