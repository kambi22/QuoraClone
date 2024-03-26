import { ThemeProvider } from "@emotion/react";
import { AccountCircle, Close, ClosedCaptionRounded, EditAttributesRounded, Home, ListAlt, Man, Menu, MenuBook, NotificationAdd, NotificationImportant, People, QuestionAnswer, Search } from "@mui/icons-material";
import { AppBar, Button, Drawer, Fab, Icon, IconButton, Input, List, TextField, Toolbar, Tooltip } from "@mui/material";
import profileAmimation from './Lotties/profileicon.json'
import React, { useEffect, useState } from "react"
import { Container, Navbar, Nav, NavbarBrand, FormControl, Form } from "react-bootstrap";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useNavigate } from "react-router";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import { Player } from "@lottiefiles/react-lottie-player";
import { createSearchParams } from "react-router-dom";
import { set } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const Header = (props) => {
  const [proToggle, setproToggle] = useState(false);
  const [menuButton, setmenuButton] = useState(false);
  const [searchToggle, setsearchToggle] = useState(false);
  const [searchItem, setsearchItem] = useState('');
  const [loginStatus, setloginStatus] = useState(false);
  const navigate = useNavigate()
  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setloginStatus(!!user);
      console.log('loginstatise', loginStatus) // Update state based on user object presence
    });

    return unsubscribe; // Clean up the listener on component unmount
  }, []);

  const SidebarHandler = () => {
    setmenuButton(!menuButton)
    console.log('menu vd', menuButton)
  };
  const searchOpen = () => {
    setsearchToggle(!searchToggle)

  };
  const searchClose = () => {
    setsearchToggle(!searchToggle)
    navigate('/')

  };
  const handleSearch = (e) => {
    setsearchItem(e.target.value)
    navigate({
      pathname: '/search',
      search: `?${createSearchParams({ searched: searchItem })}`
    })
    console.log("searched data from search is :", searchItem)

  };



  const ProfileHandler = () => {
    setproToggle(!proToggle)
    console.log('profile vd', proToggle)
  };



  return (
    <div className="sticky-top">
      <Navbar variant='dark' sticky="top" className='bg-danger '>
        <Container fluid>
          {!searchToggle && (
            <>
              <IconButton size='large' className="text-white d-sm-none d-block " edge="start" color="inherit" aria-label="menu" onClick={SidebarHandler}>
                <Menu />
              </IconButton>
              <Sidebar open={menuButton} close={SidebarHandler} />
              <Tooltip title='Home' placement='bottom' arrow>
                <Nav className="" >
                  <NavbarBrand style={{ cursor: 'pointer' }} onClick={() => navigate('/')} className='m-0 ms-3 me-5' ><strong style={{ fontWeight: 'bolder' }} className="h3">Quora</strong></NavbarBrand>
                </Nav>
              </Tooltip>
            </>
          )}
          <div className="bg-white searchbar  rounded-5 w-50 d-flex"   >
            <Form.Control placeholder="Search in Quora..." size="sm" onChange={(e) => handleSearch(e)} type="search" className=" ps-3 d-none d-sm-block rounded-start-5" />
            <IconButton className="bg-white  ps-1 pt-0 d-none d-sm-block " onClick={handleSearch} >
              <Search />
            </IconButton>

          </div>

          <div className="d-sm-none d-block d-flex  align-items-center  m-0 p-0" style={{ width: '3000px' }}>
            <Form.Control className={searchToggle ? 'd-inline   ' : 'd-none'} onChange={(e) => handleSearch(e)} style={{ width: '100%' }} type="search" placeholder="Search in Quora..." />
            <IconButton onClick={searchOpen} size='large' className={searchToggle ? 'd-none' : 'd-block text-white m-0 pt-0'}>
              <Search />
            </IconButton>
            <IconButton onClick={searchClose} size="large" className={searchToggle ? 'd-block text-white p-0 ' : 'd-none'}><Close /></IconButton>
          </div>
          <Tooltip title='Answer' placement='bottom' arrow>
            <Nav className="d-none d-sm-block ">
              <IconButton className="text-white" onClick={() => navigate('/answer')}>
                <QuestionAnswer />
              </IconButton>
            </Nav>
          </Tooltip>
          <Tooltip title='Following' placement='bottom' arrow>
            <Nav className="d-none d-sm-block ">
              <IconButton className="text-white" onClick={() => navigate('/following')}>
                <ListAlt />
              </IconButton>
            </Nav>
          </Tooltip>
          <Tooltip title='Space' placement='bottom' arrow>
            <Nav className="d-none d-sm-block ">
              <IconButton className="text-white" onClick={() => navigate('/spaces')}>
                <People />
              </IconButton>
            </Nav>
          </Tooltip>
          <Tooltip title='Notification' placement='bottom' arrow>
            <Nav className="d-none d-sm-block " >
              <IconButton className="text-white" onClick={() => navigate('/notification')}>
                <NotificationAdd />
              </IconButton>
            </Nav>
          </Tooltip>
          {!loginStatus && (

            <Nav className=" ">
              <Button className='bg-white me-2 ' onClick={() => navigate('/loginpage')}>login</Button>
            </Nav>


          )}

          {!searchToggle && (
            <>
              <Tooltip title='Question & Post' placement='bottom' arrow>
                <Nav className="">
                  <Button className="rounded-5 text-black bg-white " variant="contained" onClick={() => navigate('/addpost')} >+Add</Button>
                </Nav>
              </Tooltip>
              {loginStatus && (
                <Tooltip title='Profile' placement='bottom' arrow>
                  <Nav className='ms-2'>
                    <IconButton className=" p-0" onClick={ProfileHandler} >
                      <AccountCircle fontSize="large" className="text-white p-0" />
                    </IconButton>
                    {proToggle && (

                      <Profile />

                    )}
                  </Nav>
                </Tooltip>
              )}
            </>
          )}

        </Container>
      </Navbar>
      <Navbar className="d-sm-none d-block shadow smallNavbar" >
        <Container >
          <Tooltip title='Profile' placement='bottom' arrow>
            <Nav>
              <IconButton onClick={() => navigate('/')}>
                <Home />
              </IconButton>
            </Nav>
          </Tooltip>
          <Tooltip title='Profile' placement='bottom' arrow>
          <Nav>
            <IconButton onClick={() => navigate('/following')}>
              <ListAlt />
            </IconButton>
          </Nav>
          </Tooltip>
          <Tooltip title='Profile' placement='bottom' arrow>
          <Nav>
            <IconButton onClick={() => navigate('/answer')}>
              <QuestionAnswer />
            </IconButton>
          </Nav>
          </Tooltip>
          <Tooltip title='Profile' placement='bottom' arrow>
          <Nav>
            <IconButton onClick={() => navigate("/spaces")}>
              <People />
            </IconButton>
          </Nav>
          </Tooltip>
          <Tooltip title='Profile' placement='bottom' arrow>
          <Nav>
            <IconButton onClick={() => navigate('/notification')}>
              <NotificationAdd />
            </IconButton>
          </Nav>
          </Tooltip>

        </Container>
      </Navbar>


    </div>
  )
};

export default Header;
