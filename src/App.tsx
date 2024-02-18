import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import Login from './components/auth/login/Login';
import Signin from './components/auth/signin/Signin';
import ProtectedRoute from './security/ProtectedRoute';
import Navbar from './components/Navbar';
import MyPdf from './components/pdf/mypdf/MyPdf';
import {
	ROUTE_HOME,
	ROUTE_LOGIN,
	ROUTE_PDF,
	ROUTE_SIGNIN,
} from './utils/routes';
import { History } from './components/history/History';
import AuthProvider from './security/AuthProvider';
function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path={`${ROUTE_HOME}`}
						element={
							<ProtectedRoute>
								<Navbar />
								<HomePage />
							</ProtectedRoute>
						}
					/>
					<Route path={`${ROUTE_LOGIN}`} element={<Login />} />
					<Route path={`${ROUTE_SIGNIN}`} element={<Signin />} />
					<Route
						path={`${ROUTE_PDF}`}
						element={
							<ProtectedRoute>
								<Navbar />
								<MyPdf />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/history"
						element={
							<ProtectedRoute>
								<Navbar />
								<History />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
