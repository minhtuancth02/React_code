import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({ ...props }) => {

	const { isAuthenticated , user } = useAuth0();
	const isUser = isAuthenticated && user;
	console.log(isUser); // return false if no AuthWrapper at App.js

	return (
		<Routes>
			{ isUser ? <Route {...props} /> : <Navigate to="/login" /> }
		</Routes>
	);
};

export default PrivateRoute;
