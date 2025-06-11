import { Player } from "@lottiefiles/react-lottie-player";
import { Button, Checkbox, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import profileAmimation from './Lotties/profileicon.json'
import { Login, Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import app from "./firebase";
import { useDispatch } from "react-redux";
import { AddProfile } from "./Services/Action/action";
import GoogleButton from "react-google-button";
const LoginPage = (props) => {
  const [showPasword, setshowPasword] = useState(false);
  const [Email, setEmail] = useState('demo@gmail.com');
  const [Password, setPassword] = useState('demo@22');

  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  // Optional: Add custom scopes or parameters
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // This gives you a Google Access Token
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info
      const user = result.user;
      console.log(user);

      Swal.fire({
        icon: 'success',
        title: `Hi ${user.displayName || 'Demo Singh'}, welcome!`

      ,
        text: 'Login Sucessfull',
        timer: 3000,
        showConfirmButton: false
      });
      navigate('/')
    } catch (error) {
      console.error("Error during sign in:", error);
      // Handle errors here
      if (error.code === 'auth/account-exists-with-different-credential') {
        // Handle account linking here if needed
      }
    }
  }

  const PasswordViseabilty = () => {
    setshowPasword(!showPasword)
  };
  const LoginHandler = () => {
    if (Email === '' || Password === '') {
      console.log('data not enterd  ')
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please Enter Email & Password',
        showConfirmButton: true
      })
    } else {

      signInWithEmailAndPassword(auth, Email, Password)
        .then((snapshot) => {
          const user = snapshot.user;
          const userName = user.displayName
          console.log('username', userName);

          dispatch(AddProfile(userName))

          Swal.fire({
            icon: 'success',
            title: `Hi ${userName}`,
            text: 'Login Sucessfull',
            timer: 3000,
            showConfirmButton: false
          });
          navigate('/')
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: `Error`,
            text: 'Somthing wrong please try again',
            showConfirmButton: true,
          });
          console.log('error', error)
        });

    }
  };
  return (
    <div className="m-0 " >
      <div className=" p-4 Loginform  m-auto ">
        <Player className="  " src={profileAmimation} loop autoplay style={{ height: '250px', width: '250px' }} />
        <TextField className="w-100 " onChange={(e) => setEmail(e.target.value)} value={Email} label='Email Address' type='email' id="email" autoComplete="email" required variant='outlined' /><br />
        <TextField className="w-100 mt-3" onChange={(e) => setPassword(e.target.value)} value={Password} label='Password' type={showPasword ? 'text' : 'password'} id="password" autoComplete="password" required variant='outlined' InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton className={showPasword ? 'd-inline' : 'd-none'} onClick={() => setshowPasword(false)}>
                <Visibility />
              </IconButton>
              <IconButton className={showPasword ? 'd-none' : 'd-inline'} onClick={() => setshowPasword(true)}>
                <VisibilityOff />
              </IconButton>
            </InputAdornment>
          )
        }} /><br />
        <div className=" d-flex align-items-center">
          <Checkbox className="" />
          <label htmlFor="">Remember me</label>
        </div>

        <br />
        <Button variant='contained' size="large" onClick={LoginHandler} className="w-100 mt-3" >Login</Button>
       <p className="text-center mt-2">OR</p>
       <hr />
        <GoogleButton
          className="mt-3 w-100"
          style={{ marginTop: '20px', width: '100%', borderRadius:'10px' }}
          onClick={signInWithGoogle}
        />

        <div className="d-flex mb-3">
          <Link  >Forget Password</Link>

        </div>
        <Link className="ms-auto " to='/signup'>Don't have an account Sign Up</Link>

        <p className="">Copy @ Right My Website 2024 </p>
      </div>

    </div>
  )
};
export default LoginPage;
