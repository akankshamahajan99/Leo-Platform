import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

//import AddCrime from './AddCrime';
//import ShowCrimes from './ShowCrimes';
import ShowTroubles from './ShowTroubles';
import DROPanel from './DROPanel';
import SimpleMap from './SimpleMap';
import InTrouble from './InTrouble';
//import GoogleMap from './GoogleMap';
/*
//import SignIn from './SignIn'
import Registration from './Registration';
import StartupList from './StartupList';
import ApplicationList from './ApplicationList';
*/

//<Route exact path = "/SimpleMap" componenet = {SimpleMap} />
					

class App extends Component {
	render() {
		/*
		return (
			<GoogleMap />
		);*/
		
		return (
			<div><center><h1>Leo Help</h1></center>
			<Router>
				<div className="App">
				<Switch>
					<Route exact path="/DROPanel" component={DROPanel} />
					<Route exact path = "/InTrouble" component = {InTrouble} />
					<Redirect from="/" to="DROPanel" />
				</Switch>
				</div>
			</Router>
			</div>
		);
	}
}
export default App;