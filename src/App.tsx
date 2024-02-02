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
        </Routes>
      </BrowserRouter>
      <HomePage />
    </>
  );
}

export default App;
