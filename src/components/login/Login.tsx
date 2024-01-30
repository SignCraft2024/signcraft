import "../../styles/form.css"
import logo from '../../assets/logo.png'
import google from '../../assets/google.svg'
import { useNavigate } from "react-router-dom";

function Log() {
    const navigate = useNavigate();

    return (
        <div className="form-container">
           <h1>Log in</h1>
           <div className="form">
                <div>
                    <img src={logo} className="logo"/>
                </div>
                <div className="input-container">
                    <div className="input">
                        <input type="text" placeholder="Email" className="form-input"/>
                        <input type="text" placeholder="Password" className="form-input"/>  
                        <input type="button" value="Log in" className="form-input-button"/>
                    </div>
                    
                    <div className="google-container">
                        <p className="txt">or , continue with</p>
                        <button className="google">
                            <img src={google}/>
                        </button>
                    </div>
                    <div>
                        <p>You don't have account ? please ,<button className="signin-button" onClick={() => navigate("/signin")}> Sign in !</button></p>
                    </div>
                </div>    
           </div>
        </div>
    )
}

export default Log;