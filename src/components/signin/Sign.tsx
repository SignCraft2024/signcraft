import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import google from '../../assets/google.svg'
import '../../styles/form.css'

function Signin() {
    
    const navigate = useNavigate();

    return (
        <div className="form-container">
           <h1>Sign in !</h1>
           <div className="form">
                <div>
                    <img src={logo} className="logo-signin"/>
                </div>
                <div className="input-container">
                    <input type="text" placeholder="Email" className="form-input"/>
                    <input type="text" placeholder="Password" className="form-input"/>  
                    <input type="button" value="Sign in" className="form-input-button" onClick={() => {navigate("/login")}}/>

                    <div className="google-container">
                        <p className="txt">Sign in with</p>
                        <button className="google">
                            <img src={google} />
                        </button>
                    </div>
                </div>    
           </div>
        </div>
    )
}

export default Signin;