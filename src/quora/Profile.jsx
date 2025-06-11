import { AddToPhotos, Bookmark, Bookmarks, Campaign, DarkMode, Delete, Drafts, Equalizer, Language, List, Logout, MessageSharp, MonetizationOn, Settings, Star } from "@mui/icons-material";
import { Avatar, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react"
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import app from './firebase'
import { getAuth } from "firebase/auth";
const Profile = (props) => {
  const navigate = useNavigate();
  const userName = useSelector(state => state.followitems.username)
  const keys = useSelector(state => state.followitems.follows);
  const [currentUser, setCurrentUser] = useState(null); // Initialize as null
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      console.log("User data:", user); // Check what you're getting
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Render nothing or loading state while checking auth
  if (currentUser === null) {
    return <div>Loading...</div>;
  }

  // If not logged in
  if (!currentUser) {
    return <div>Please sign in</div>;
  }

  const LogoutConfirm = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Logout',
      text: 'Are you sure you want to Logout',
      showConfirmButton: true
    }).then((resp) => {
      if (resp.isConfirmed) {
        navigate('/logout');
      }
    }).catch((error) => console.error('error', error));
  }

  return (
    <div className="  MainProfile   ">

      <Card className="shadow procard w-100 ms-auto  ">
        <Card.Header>
          <div className="d-flex p-1 align-items-center">
            {currentUser? (currentUser.photoURL && (
              <img
                src={currentUser.photoURL}
                alt="Profile"
                className="avatar"
                referrerPolicy="no-referrer" // Needed for Google images
                style={{borderRadius:'50%', height:'40px', width:'40px'}}
              
              />
            )):(
              <Avatar>U</Avatar>
            )}
            <h5 className="ms-2">
              {currentUser.displayName || currentUser.email || "User"}
            </h5>
          </div>
        </Card.Header>
        <ListItemButton onClick={() => navigate('/myposts')}>
          <ListItemIcon>
            <AddToPhotos />
          </ListItemIcon>
          <ListItemText primary='My Posts' />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/questionslist')}>
          <ListItemIcon>
            <List />
          </ListItemIcon>
          <ListItemText primary='My Question List' />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <MessageSharp />
          </ListItemIcon>
          <ListItemText primary='Masseges' />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Campaign />
          </ListItemIcon>
          <ListItemText primary='Create Ad' />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <MonetizationOn />
          </ListItemIcon>
          <ListItemText primary='Monitization' />
        </ListItemButton>
        <hr className="m-0" />
        <ListItemButton>
          <ListItemIcon>
            <Equalizer />
          </ListItemIcon>
          <ListItemText primary='Your content & status' />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/bookmark')}>
          <ListItemIcon>
            <Bookmarks />
          </ListItemIcon>
          <ListItemText primary='Bookmark' />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Drafts />
          </ListItemIcon>
          <ListItemText primary='Draft' />
        </ListItemButton>

        <hr className="m-0" />
        <ListItemButton>
          <ListItemIcon>
            <DarkMode />
          </ListItemIcon>
          <ListItemText primary='Dark mode' />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary='Settings' />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/language')}>
          <ListItemIcon>
            <Language />
          </ListItemIcon>
          <ListItemText primary='Language' />
        </ListItemButton>
        <ListItemButton onClick={LogoutConfirm}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/deleteaccount')}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary='Delete Account' />
        </ListItemButton>




      </Card>
    </div>
  )
};

export default Profile;
