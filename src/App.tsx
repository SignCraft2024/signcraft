/*import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'*/
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Log from './components/login/Login'
import Signin from './components/signin/Sign'

function App() {
  /*const [count, setCount] = useState(0)*/


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
