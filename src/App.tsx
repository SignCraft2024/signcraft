import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Log from './components/login/Login'
import Signin from './components/signin/Sign'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Log/>} />
          <Route path="/signin" element={<Signin/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
