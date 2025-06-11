import { Bookmark, Comment, ErrorRounded, Favorite, FavoriteBorder, MoreVertOutlined, Share, ThumbDown, ThumbDownAltOutlined, ThumbUp, ThumbUpAltOutlined, ThumbUpOutlined } from "@mui/icons-material";
import { Avatar, Button, Card, Icon, IconButton, Checkbox, ListItemIcon, ListItemText, Menu, MenuItem, Popover, Typography, ListItemButton, Drawer, Snackbar, Skeleton, Grid, Container, CardHeader, CardContent, CardMedia, CardActionArea, Box, CardActions } from "@mui/material";
import { Database, get, getDatabase, ref, set, update } from "firebase/database";
import React, { useEffect, useState } from "react"
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
import { BarLoader, DotLoader } from "react-spinners";
import followindLoader from './Lotties/followingLoader.json';
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
  const [loading, setloading] = useState(false);

  const database = getDatabase(app)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const auth = getAuth()

  const readPost = async () => {
    try {
      setloading(true)
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

        console.log("postvalueis is", PostValue)
        console.log("postvalueis is", PostValue.length)
      } else {
        // Handle case where no posts exist
      }
    } catch (error) {
      console.log("Something went wrong:", error);

    } finally { setloading(false) }
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

  const bgColores = ['bg-info', 'bg-primary', 'bg-warning', 'bg-success']



  return (
    <div className="d-flex mb-5  "  >



      <Container maxWidth="xl" sx={{ mt: 3, mb: 12, height: '100vh' }}>
        <Grid container spacing={3} sx={{ mb: 12 }}>
          {loading ? Object.entries(PostValue).reverse().map(([key, item], i) => (
            <Grid item xs={12} sm={8} md={6} xl={4} key={key}>
              <Card sx={{ height: '100%', borderRadius: 4, boxShadow: 3 }}>
                <div className="d-flex m-3">
             
                    <Avatar className={`${bgColores[i % bgColores.length]}`}>
                      {item.ChannelName[0]}
                    </Avatar>
                
                    <div className="ms-1">
                      <Typography variant="h6" sx={{ m: 0, p: 0 }}>
                      {item.ChannelName}
                    </Typography>
                
                    <Typography variant="body2" color="text.secondary" sx={{ m: 0, p: 0 }}>
                      {item.DateTime}
                    </Typography>
                    </div>
              
                    <div className="ms-auto">
                      <Button className='p-2 rounded-4' variant="outlined" onClick={() => FollowHandler(key)}>
                      Follow
                    </Button>
                    </div>
                  
                </div>


                <CardContent sx={{ pt: 0 }}>
                  <Typography variant="h6" sx={{ textAlign: 'left', ml: 1, mb: 1 }}>
                    {item.Post}.
                  </Typography>
                  <Typography variant="h6" sx={{ textAlign: 'left', mb: 2 }}>
                    {item.Comment}
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  height="250"
                  image={item.ImageUrl}
                  alt="Post images"
                  sx={{ p: 0 }}
                />
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Checkbox
                      onClick={() => setLike(!Like)}
                      icon={<ThumbUpAltOutlined />}
                      checkedIcon={<ThumbUp />}
                    />
                    <Snackbar
                      message={!Like ? 'Liked Post' : 'DisLike Post'}
                      open={snak}
                      autoHideDuration={2000}
                      onClose={() => setsnak(true)}
                    />
                    <Checkbox
                      icon={<ThumbDownAltOutlined />}
                      checkedIcon={<ThumbDown />}
                    />
                  </Box>
                  <Box>
                    <IconButton onClick={() => { GotoComments(key) }}>
                      <Comment />
                    </IconButton>
                    <IconButton onClick={SharePost}>
                      <Share />
                    </IconButton>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          )) : (
            <Box className=' m-auto mt-5' sx={{  mt: 5 }}>
              <Player
                src={followindLoader}
                loop
                autoplay
                style={{ height: '200px', width: '200px' }}
              />
              <Typography variant="body1" >
                Loading...
              </Typography>
            </Box>
          )}
        </Grid>
      </Container>




    </div>


  )
};

export default Home;
