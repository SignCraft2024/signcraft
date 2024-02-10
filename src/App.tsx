import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage/HomePage';
import Login from './components/Auth/Login/Login';
import Signin from './components/Auth/Signin/Signin';
import AuthProvider from './security/AuthProvider';
import ProtectedRoute from './security/ProtectedRoute';
import DocumentViewerComponent from './components/pdf/pspdfkit/DocumentViewerComponent';
import Header from './components/Header';

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signin" element={<Signin />} />
					<Route
						path="/home"
						element={
							<ProtectedRoute>
								<Header />
								<HomePage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/pdf"
						element={
							<ProtectedRoute>
								<Header />
								<DocumentViewerComponent />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
