import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import Login from './components/auth/login/Login';
import Signin from './components/auth/signin/Signin';
import AuthProvider from './security/AuthProvider';
import ProtectedRoute from './security/ProtectedRoute';
import DocumentViewerComponent from './components/pdf/pspdfkit/DocumentViewerComponent';
import Navbar from './components/Navbar';
import MyPdf from './components/pdf/mypdf/MyPdf';
import { ROUTE_HOME, ROUTE_LOGIN, ROUTE_PDF_1, ROUTE_PDF_2, ROUTE_SIGNIN } from './utils/routes';

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
						path={`${ROUTE_PDF_1}`}
						element={
							<ProtectedRoute>
								<Navbar />
								<DocumentViewerComponent />
							</ProtectedRoute>
						}
					/>
					<Route
						path={`${ROUTE_PDF_2}`}
						element={
							<ProtectedRoute>
								<Navbar />
								<MyPdf />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
