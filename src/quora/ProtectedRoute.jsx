import { Button } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react"
import { useNavigate } from "react-router";

const ProtectedRouet = (props) => {
   const auth = getAuth();
   const navigate = useNavigate();
   const {Component} = props
   
   useEffect(()=>{
    const checkAuth = () => {
      const unsbscribe = onAuthStateChanged(auth ,(user)=>{
       if (!user) {
         console.log("user logout")
         navigate('/loginpage')
       }
      })
  }
  checkAuth()
   },[])
    
  return (
    <div>
      <Component/>
    </div>
  )
};

export default ProtectedRouet;

