import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage/HomePage';

import Pdf from './components/pdf/Pdf';
import ProfilePage from './components/profile/ProfilePage';

import { ShowFile } from './components/FileUpload/ShowFile';
import Login from './components/Auth/Login/Login';
import Signin from './components/Auth/Signin/Signin';
import AuthProvider from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';

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
								<HomePage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/upload"
						element={
							<ProtectedRoute>
								<ShowFile />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/profile"
						element={
							<ProtectedRoute>
								<ProfilePage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/pdf"
						element={
							<ProtectedRoute>
								<Pdf />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
