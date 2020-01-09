import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import AddCrime from './AddCrime';
import ShowCrimes from './ShowCrimes';
/*
//import SignIn from './SignIn'
import Registration from './Registration';
import StartupList from './StartupList';
import ApplicationList from './ApplicationList';
*/
class App extends Component {
	render() {
		return (
			<div><center><h1>Leo Mine</h1></center>
			<AddCrime />
			<ShowCrimes />
			</div>
		);
	}
}
export default App;
