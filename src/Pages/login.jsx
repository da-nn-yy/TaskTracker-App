import React from 'react'
import {signInWithPopup} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {auth, provider} from "../firebase.js";


const Login = () => {

  const navigate = useNavigate();

  const handleGoogleSignin = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/")
  }
  return (
    <div>
      <button onClick={handleGoogleSignin()}>Sign in with Google</button>
    </div>
  )
}
export default Login;
