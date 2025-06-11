import { ThemeProvider } from "@emotion/react";
import { AccountCircle, Close, ClosedCaptionRounded, EditAttributesRounded, Home, ListAlt, Man, Menu, MenuBook, NotificationAdd, NotificationImportant, People, QuestionAnswer, Search } from "@mui/icons-material";
import { AppBar, Button, Drawer, Fab, Icon, IconButton, Input, List, TextField, Toolbar, Tooltip } from "@mui/material";
import profileAmimation from './Lotties/profileicon.json'
import React, { Profiler, useEffect, useRef, useState } from "react"
import { Container, Navbar, Nav, NavbarBrand, FormControl, Form } from "react-bootstrap";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useNavigate } from "react-router";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import { Player } from "@lottiefiles/react-lottie-player";
import { createSearchParams } from "react-router-dom";
import { Avatar, Chip, Divider, InputAdornment } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SearchIcon from '@mui/icons-material/Search';
import { BsArrowReturnRight } from "react-icons/bs";


const Header = (props) => {
  const [proToggle, setproToggle] = useState(false);
  const [menuButton, setmenuButton] = useState(false);
  const [searchToggle, setsearchToggle] = useState(false);
  const [searchItem, setsearchItem] = useState('');
  const [loginStatus, setloginStatus] = useState(false);
  const navigate = useNavigate()
  const auth = getAuth()
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const profileRef = useRef();

    useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setproToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const searchRef = useRef(null);


  const suggestions = [
    "How to host react js project in firebase?",
    "What is React JS?",
    "What is the salary for a blockchain developer in India?",
    "Which car is good for average?",
    "Which laptop is best for coding?",

  ];

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleSearchbar = (event) => {
    setSearchValue(event.target.value);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



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
    setSearchValue(e.target.value)
    navigate({
      pathname: '/search',
      search: `?${createSearchParams({ searched: searchValue })}`
    })

  };
  const RecentSearch = (keyword) => {
    setSearchValue(keyword)
    navigate({
      pathname: '/search',
      search: `?${createSearchParams({ searched: searchValue })}`
    })


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

              <Nav className="" >
                <NavbarBrand style={{ cursor: 'pointer' }} onClick={() => navigate('/')} className='m-0 ms-3 me-5' ><strong style={{ fontWeight: 'bolder' }} className="h3">Quora</strong></NavbarBrand>
              </Nav>

            </>
          )}
          {/* <div className="bg-white searchbar  rounded-5 w-50 d-flex"   >
            <Form.Control placeholder="Search in Quora..." size="sm" onChange={(e) => handleSearch(e)} type="search" className=" ps-3 d-none d-sm-block rounded-start-5" />
            <IconButton className="bg-white  ps-1 pt-0 d-none d-sm-block " onClick={handleSearch} >
              <Search />
            </IconButton>

          </div> */}

          {/* large search bar */}
          <div className="d-none d-sm-block bg-white w-50 rounded-2 " ref={searchRef} style={{ position: "relative", width: "300px" }}>
            <TextField
              variant="outlined"
              fullWidth
              type="search"
              placeholder="Search…"
              value={searchValue}
              onFocus={handleFocus}
              onChange={(e) => handleSearch(e)}
              size="small"
              className="rounded-3 "
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {showSuggestions && (
              <div
                style={{
                  position: "absolute", top: "40px", width: "100%", background: "white", borderRadius: "10px",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.2)", zIndex: 1000, height: '400px', overflowY: 'scroll'
                }}
                className="text-black  text-start text-muted"
              >
                <div className="p-4 ">
                  <h6 className="text-start mb-3" style={{ color: 'gray' }}>Recent Searches</h6>
                  <div className="d-felx">
                    <Chip className="me-1" clickable label='Laptop' onClick={() => RecentSearch('laptop')} />
                    <Chip className="me-1" clickable label='Coding' onClick={() => RecentSearch('coding')} />
                    <Chip className="me-1" clickable label='Project' onClick={() => RecentSearch('project')} />
                  </div>
                  <h6 className="text-start mb-3 mt-3" style={{ color: 'gray' }}>Help</h6>
                  <div className="d-felx">
                    <h6><i className="me-3"><BsArrowReturnRight /></i>How to setup theme</h6>
                    <h6><i className="me-3"><BsArrowReturnRight /></i>View detail documentation</h6>
                  </div>
                  <h6 className="text-start mb-3 mt-3" style={{ color: 'gray' }}>Users</h6>
                  <div className="d-flex">
                    <Avatar sx={{ height: 30, width: 32 }} >S</Avatar>
                    <h6 className="mt-2 ms-2">Satnam singh</h6>
                  </div>
                  <div className="d-flex">
                    <Avatar sx={{ height: 30, width: 32 }} ></Avatar>
                    <h6 className="mt-2 ms-2">Ayush singh</h6>
                  </div>
                  <div className="d-flex">
                    <Avatar sx={{ height: 30, width: 32 }} />
                    <h6 className="mt-2 ms-2">Omm singh</h6>
                  </div>

                </div>



                {suggestions
                  .filter((item) =>
                    item.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  .map((suggestion, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "8px 12px",
                        cursor: "pointer",

                      }}
                      onClick={() => setSearchValue(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}


              </div>
            )}

          </div>


          {/* end large  Searchbar======================  End  ==========================*/}
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

                      <div className="" ref={profileRef}>
                        <Profile />

                      </div>
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
