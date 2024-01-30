import './App.css';
import NavBar from './components/Navx';
import './styles/nav.css';
import './App.css'
import Footx from './components/Footx';
import ShowFile from './component/file_upload/ShowFile';
import './components/ProfilePage';
import './styles/profile.css';



function App() {

  return (
    <>
    <NavBar>
    <ProfilePage/>
      <ShowFile/>
    </>
  );
}

export default App;
