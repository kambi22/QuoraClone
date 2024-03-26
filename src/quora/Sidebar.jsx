import { Comment, CommentBank, DarkMode, Home, Language, List, Login, Logout, NotificationAdd, People, Settings, Share, ThumbDown, ThumbUp } from "@mui/icons-material";
import { Avatar, Button, Drawer, IconButton, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react"
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './Quora.css'
import Swal from "sweetalert2";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const Sidebar = ({ open, close }) => {
  const [loginStatus, setloginStatus] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setloginStatus(!!user)
    })
  }, [])

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
    <div className="">

      <Drawer className="  d-sm-none d-block   " anchor="left" open={open} onClose={close} >
        <div className=" MySidebar h-100 bg-white">

          <ListItemButton className="p-3" onClick={() => navigate('/')}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItemButton>
          <hr className="mt-0" />
          <ListItemButton onClick={() => navigate('/following')}>
            <ListItemIcon>
              <List />
            </ListItemIcon>
            <ListItemText primary='Following' />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/comments')}>
            <ListItemIcon>
              <CommentBank />
            </ListItemIcon>
            <ListItemText primary='Comments' />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/spaces')}>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary='Spaces' />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/notification')}>
            <ListItemIcon>
              <NotificationAdd />
            </ListItemIcon>
            <ListItemText primary='Notification' />
          </ListItemButton>
          <hr className="" />
          <ListItemButton>
            <ListItemIcon>
              <DarkMode />
            </ListItemIcon>
            <ListItemText primary='Dark mode' />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/language')}>
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <ListItemText primary='Language' />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/settings')}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary='Settings' />
          </ListItemButton>
          {loginStatus && (
            <ListItemButton onClick={() =>navigate('/logout')}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItemButton>
          )}
          {!loginStatus && (
            <ListItemButton onClick={() => navigate('/loginpage')}>
            <ListItemIcon>
              <Login/>
            </ListItemIcon>
            <ListItemText primary='login' />
          </ListItemButton>
          )}

    </div>

  
</Drawer >
      </div >
  )
};

export default Sidebar;




