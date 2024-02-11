import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage/HomePage';
import Login from './components/Auth/Login/Login';
import Signin from './components/Auth/Signin/Signin';
import AuthProvider from './security/AuthProvider';
import ProtectedRoute from './security/ProtectedRoute';
import DocumentViewerComponent from './components/pdf/pspdfkit/DocumentViewerComponent';
import Navbar from './components/Navbar';

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<Navbar />
								<HomePage />
							</ProtectedRoute>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/signin" element={<Signin />} />
					<Route
						path="/pdf"
						element={
							<ProtectedRoute>
								<Navbar />
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
