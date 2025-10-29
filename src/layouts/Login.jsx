import React, { Component } from "react";
import { Route } from "react-router";
import Login from "components/Login/Index";

class LoginLayout extends Component {
	state = {};
	render() {
		return <Route path='/login' component={Login}></Route>;
	}
}

export default LoginLayout;
