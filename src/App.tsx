import './App.css';
import './styles/nav.css';
import './App.css';
import './components/ProfilePage';
import './styles/nav.css'
import ShowFile from './components/file_upload/ShowFile';
import './styles/profile.css';
import ProfilePage from './components/ProfilePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Log from './components/login/Login'
import Signin from './components/signin/Sign'

import './App.css';
import HomePage from './components/Homepage/HomePage';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Log/>} />
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/home" element={<HomePage />}/>
          <Route path="/upload" element={<ShowFile/>}/>
          <Route path="/upload" element={<ProfilePage />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
