import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const AuthorizeRoute = ({ children, ...rest }) => {
	const loginState = useSelector((state) => state.login);
	return (
		<Route
			{...rest}
			render={({ location }) => {
				return loginState.status === true ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/user/login',
							state: { from: location },
						}}
					/>
				);
			}}
		/>
	);
};

export default AuthorizeRoute;
