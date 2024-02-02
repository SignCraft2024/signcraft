import './App.css';
import './styles/nav.css';
import './styles/nav.css';
import ShowFile from './components/Fileupload/ShowFile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Signin from './components/Signin/Sign';
import HomePage from './components/Homepage/HomePage';
import ProfilePage from './components/Profile/ProfilePage';
import Pdf from './components/pdf/Pdf';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/upload" element={<ShowFile />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/pdf" element={<Pdf />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
