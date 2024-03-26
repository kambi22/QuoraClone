import { deleteUser, getAuth, signOut } from "firebase/auth";
import React, { useEffect } from "react"
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import app from "./firebase";

const DeleteAccount = (props) => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  useEffect(() => {
    signOut(auth)
      .then(() => {
        // Delete the user account
        const user = auth.currentUser;
        if (user) {
          deleteUser(user)
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: 'Logout',
                text: 'Logout Successful. User account deleted.',
                timer: 3000,
                showConfirmButton: false
              });
              navigate('/');
            })
            .catch((error) => {
              console.log('error', error);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong. Please try again.',
                timer: 3000,
                showConfirmButton: false
              });
            });
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        console.log('error', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong. Please try again.',
          timer: 3000,
          showConfirmButton: false
        });
      });
  }, []);

  return null; 
    
};

export default DeleteAccount;
