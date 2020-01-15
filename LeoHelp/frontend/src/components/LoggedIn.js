import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import classNames from 'classnames';
//import { UserRegistration, user_nameValidation } from '../services/RegistrationService';
import Error from '../elements/Error';
import { REGISTRATION_FIELDS, REGISTRATION_MESSAGE, COMMON_FIELDS, ERROR_IN_REGISTRATION } from '../MessageBundle';
import 'bootstrap/dist/css/bootstrap.min.css';
//import NavBar from './NavBar'

export default class LoggedIn extends React.Component {
	constructor(props) {
		super(props)
		this.state= {
			user_name:localStorage.getItem('user_name'),
			name: ""
		}
		console.log(this.state.user_name)
	}


	render() {

		if(localStorage.getItem("session_start") !== "start") {
            return <Redirect to ='/UserSignIn'/>
        }
		return (
			<div>
			<nav className='navbar navbar-expand-lg navbar-light bg-light'></nav>

			<h3>Logged In </h3>

			<link
			  rel="stylesheet"
			  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
			  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
			  Crossorigin="anonymous"
			/>
			</div>

		)

	}

}