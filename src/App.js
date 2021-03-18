import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages/index';

// const BrowserRouter = import("react-router-dom").BrowserRouter;
// const Route = import('react-router-dom').Route;
// const Routes = import('react-router-dom').Routes;

function App() {
	return (
		<AuthWrapper>
			<BrowserRouter>
				<Routes>
					<PrivateRoute path="/" element={<Dashboard />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" elememt={<Error />} />
				</Routes>
			</BrowserRouter>
		</AuthWrapper>
	);
}

export default App;
