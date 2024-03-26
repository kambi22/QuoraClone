import { Player } from "@lottiefiles/react-lottie-player";
import React, { useState } from "react"
import profileAnimation from './Lotties/profileicon.json'
import { Button, Checkbox, IconButton, InputAdornment, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import Swal from "sweetalert2";
import app from "./firebase";
const SingInPage = (props) => {
  const [showPassword ,setshowPassword ] = useState(false);
  const [FirstName ,setFirstName ] = useState('');
  const [LastName,setLastName] = useState('');
  const [Email,setEmail] = useState('');
  const [Password ,setPassword ] = useState('');
  const navigate = useNavigate();

  const auth = getAuth(app)


  const SignInHandler = () => {
      if (FirstName === '' || LastName === '' || Email === '' || Password === '' ) {
        Swal.fire({
          icon:'warning',
          title:'warning',
          text:'Please Enter Your Details',
          showConfirmButton:true
        })


      }else{
        createUserWithEmailAndPassword(auth,Email,Password).then((snapshot)=>{
           
          const user = snapshot.user

          updateProfile(user, {
            displayName: `${FirstName} ${LastName}`
          })
          .then(()=>{
            Swal.fire({
              icon:'success',
              title:`Hi ${FirstName} ${LastName}`,
              text:'SignUp Sucessfull',
              timer:3000,
              showConfirmButton:false
            })
            navigate('/')
          }).catch((error)=>console.log('error name',error))
          
          
        }).catch((error)=>{
          console.log('error',error)
  
        Swal.fire({
          icon:'error',
          title:'Error',
          text:'An Error during Login',
          showConfirmButton:true
        })
        }
        )

        console.log("name email passward",FirstName,LastName,Email,Password)
      }
  };
  return (
    <div className="">
    <div className=" m-auto Loginform p-4">
    
      <Player src={profileAnimation} loop autoplay style={{height:'250px',width:'250px'}}/>
    
   <div className="d-flex">
   <TextField className="me-2 w-50 mt-0" onChange={(e)=>setFirstName(e.target.value)} value={FirstName} style={{width:'36%'}} label='First Name' type="text" id="fistname" name="fistname" required/>
    <TextField className="ms-2 w-50 mb-2" onChange={(e)=>setLastName(e.target.value)} value={LastName} style={{width:'36%'}} label='Last Name' type="text" id="lastname" name="lastname" required/><br />
   </div>
    <TextField className="w-100 me-5 mb-2" onChange={(e)=>setEmail(e.target.value) } value={Email} label='Email Address' type="email" id="email" name="email" required/>
    <TextField className="w-100 mb-0" onChange={(e)=>setPassword(e.target.value)} value={Password} label='Password' type={showPassword ? 'text':'password'} id="password" name="password" required InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton className={showPassword ? 'd-inline':'d-none'} onClick={()=>setshowPassword(false)}>
            <Visibility/>
          </IconButton>
          <IconButton className={showPassword ? 'd-none':'inline'} onClick={()=>setshowPassword(true)}>
            <VisibilityOff/>
          </IconButton>
        </InputAdornment>
      )
    }}/>
   <div className="d-flex align-items-center">
    <Checkbox />
    <label htmlFor="">Remember me</label>
   </div>
   <Button className="w-100 mt-3" onClick={SignInHandler} variant="contained">Sign Up</Button>
   <div className="d-flex mb-3">
     <Link  >Forget Password</Link>
      
     </div>
     <Link className="ms-auto " to='/loginpage'>If you have an account Login</Link>
       
   <p className="">Copy @ Right My Website 2024 </p>
    </div>

    </div>
  )
};

export default SingInPage;
