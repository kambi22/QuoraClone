import { getAuth, signOut } from "firebase/auth";
import React, { useEffect } from "react"
import app from "./firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Logout = (props) => {
  const auth = getAuth(app)
  const navigate = useNavigate();

  localStorage.clear('persist:post-key')
  
  useEffect(()=>{
      signOut(auth).then(()=>{
        Swal.fire({
          icon:'success',
          title:'Logout',
          text:'Logout Successfull',
          timer:3000,
          showConfirmButton:false
        })
        navigate('/')
      }).catch((error)=>{
        console.log('error',error)

        Swal.fire({
          icon:'error',
          title:'Error',
          text:'Somthing wrong please try again',
          timer:3000,
          showConfirmButton:false
        })
      })
  },[]);
};
export default Logout;
