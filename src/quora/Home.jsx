import { Bookmark, Comment, ErrorRounded, Favorite, FavoriteBorder, MoreVertOutlined, Share, ThumbDown, ThumbDownAltOutlined, ThumbUp, ThumbUpAltOutlined, ThumbUpOutlined } from "@mui/icons-material";
import { Avatar, Button, Icon, IconButton, Checkbox, ListItemIcon, ListItemText, Menu, MenuItem, Popover, Typography, ListItemButton, Drawer, Snackbar, Skeleton } from "@mui/material";
import { Database, get, getDatabase, ref, set, update } from "firebase/database";
import React, { useEffect, useState } from "react"
import { Card, Col, Container, Dropdown, Row, Toast } from "react-bootstrap";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import app from "./firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { AddItem } from "./Services/Action/action";
import { Player } from "@lottiefiles/react-lottie-player";
import Loader from './Lotties/loader.json'
import { getAuth, onAuthStateChanged } from "firebase/auth";
//import { FacebookShareButton, TwitterShareButton, EmailShareButton } from 'react-share';
const Home = (props) => {
  const [Like, setLike] = useState(false);
  const [Dislike, setDislike] = useState(false);
  const [LikedKey, setLikedKey] = useState([]);
  const [showDialog, setshowDialog] = useState(false);
  const [PostValue, setPostValue] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [snak, setsnak] = useState(false);
  const [toast, setToast] = useState(false);
  const [IsOnline, setIsOnline] = useState(navigator.onLine);
  const [followItem, setfollowItem] = useState([]);
  const [postDateTime, setpostDateTime] = useState();
  const [loading, setloading] = useState();
  const [loader, setLoader] = useState();
  const database = getDatabase(app)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const auth = getAuth()

  const readPost = async () => {
    try {
      const Postresp = await get(ref(database, '/Posts/'));
      if (Postresp.exists()) {
        const postObj = {};
        Postresp.forEach((snapshot) => {
          const key = snapshot.key;
          const postText = snapshot.val();

          // Assign each property separately to the postObj
          postObj[key] = {
            Post: postText.Post,
            ImageUrl: postText.ImageUrl,
            DateTime: postText.DateTime,
            Comment: postText.comment,
            ChannelName: postText.ChannelName
          };
        });
        setPostValue(postObj);
        setloading(PostValue)
        console.log("postvalueis is", PostValue)
        console.log("postvalueis is", PostValue.length)
      } else {
        // Handle case where no posts exist
      }
    } catch (error) {
      console.log("Something went wrong:", error);
      setLoader(loader)
    }
  };
  useEffect(() => {
    readPost()
  }, []);



  //Like follow area
  const FollowHandler = (key) => {
    const unsbscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("user logout")
        navigate('/loginpage')
      } else {
        
        dispatch(AddItem(key))
        setToast(!toast)
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Follow ',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })
      }
    })
  };



  //Like handler area
  const AddLike = (key) => {
    setLike(!Like)
    setDislike(false)
    setsnak(!snak)

  }



  //DisLike handler area
  const AddDislike = (key) => {
    setDislike(!Dislike)
    setLike(false)
    setsnak(!snak)


  }
  const HandleDialog = () => {
    setshowDialog(!showDialog)
    console.log('dialog :', showDialog)
  };

  const GotoComments = (key) => {
    navigate({
      pathname: '/comments',
      search: `?${createSearchParams({ key: key })}`
    })
  };
  const SharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Quora',
        text: 'Check out this interesting page.',
        url: window.location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert('Web Share API is not supported in your browser.');
    }
  }

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="d-flex mb-5" >


      {IsOnline && loading ? (

        <Container className="mt-3 w-100  " >
          <Row className="mb-2" style={{ height: '400px' }}>
            {Object.entries(PostValue).reverse().map(([key, item]) => (
              <>
                <Col className="mb-2" xs={12} sm={8} md={6} xl={4}  >
                  <Card className="mt-3 h-100 w-100 "  >
                    <Card.Header >
                      <div className="d-flex  align-items-center ">
                        <Avatar>{item.ChannelName[0]}</Avatar>
                        <div className="ms-2 me-2" >
                          <h6 className="m-0 p-0">{item.ChannelName}</h6>
                          <p className="m-0 p-0 text-start" >{item.DateTime}</p>
                        </div>
                        <Button className="mb-2 ms-auto m-3" onClick={() => FollowHandler(key)}>Follow</Button>


                      </div>
                      <h6 className="text-start">{item.Post}.</h6>
                      <h6 className="text-start">{item.Comment}</h6>
                    </Card.Header>
                    <Card.Body className="p-0 bg-info" style={{ height: '150px' }} >
                      <img className="h-100 w-100 p-0" src={item.ImageUrl} alt="image" />
                    </Card.Body>
                    <Card.Footer className="d-flex" >
                      <div className="" >

                        <Checkbox className="" onClick={() => setLike(!Like)} icon={<ThumbUpAltOutlined />} checkedIcon={<ThumbUp />} />

                        <Snackbar message={!Like ? 'Liked Post' : 'DisLike Post'} open={snak} autoHideDuration={2000} onClose={() => setsnak(true



                        )} />


                        <Checkbox className="" icon={<ThumbDownAltOutlined />} checkedIcon={<ThumbDown />} />
                        <i>
                          <FontAwesomeIcon icon={<ThumbUp />} />
                        </i>
                      </div>
                      <IconButton className="" onClick={() => { GotoComments(key) }} >
                        <Comment />
                      </IconButton>
                      <IconButton onClick={SharePost} className="" >
                        <Share />
                      </IconButton>

                    </Card.Footer>
                  </Card>

                </Col>
              </>
            ))}

          </Row>

        </Container>
      ) : (
        <Container className="mt-5 " >
          <Row className="mb-2" style={{ height: '400px' }}>
            {Object.entries(PostValue).reverse().map(([key, item]) => (

              <Col className="mb-2" xs={12} sm={8} md={6} xl={4}  >
                <div className="d-flex" >
                  <Skeleton animation='wave' variant='circular' height={40} width={40} />
                  <Skeleton animation='wave' className="w-75 ms-2 mt-1" variant='rectangular' height={30} />
                </div>
                <div className="d-flex mt-2 raunded-5">
                  <Skeleton animation='wave' variant='rectangular' className="w-100" height={200} />
                </div>
                <div>
                  <Skeleton animation='wave' variant="rectangular" className="w-50 mt-2" height={30} />
                </div>

              </Col>
            ))}
          </Row>
          <Snackbar title="Your Offline" message='Check Internet Your Offline' />

        </Container>
      )}

    </div>


  )
};

export default Home;
