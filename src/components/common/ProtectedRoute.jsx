import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../Services/Auth";

const ProtectedRoute = ({ path, component: Component, ...rest }) => {
	return (
		<Route
			path={path}
			{...rest}
			render={(props) => {
				return Auth.isAuthenticated() ? <Component {...props} /> : <Redirect to='/login' />;
			}}
		/>
	);
};

export default ProtectedRoute;
