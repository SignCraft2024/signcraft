import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage/HomePage';
import Login from './components/login/Login';
import Pdf from './components/pdf/Pdf';
import Signin from './components/signin/Sign';
import { ShowFile } from './components/FileUpload/ShowFile';
import NavBar from './components/navbar/Nav';

function App() {
	return (
		<>
			<NavBar />
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/upload" element={<ShowFile />} />
					<Route path="/pdf" element={<Pdf />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
