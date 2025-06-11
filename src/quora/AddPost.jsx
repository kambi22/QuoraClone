import { PermMedia } from "@mui/icons-material";
import { Avatar, Button, CssBaseline, IconButton, Input, Tab, Tabs, TextField, TextareaAutosize, ThemeProvider, createTheme } from "@mui/material";
import React, { useEffect, useState } from "react"
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import { getDatabase, push, ref, serverTimestamp, set } from "firebase/database";
import app from "./firebase";
import { getStorage, uploadBytes, getDownloadURL, ref as sref } from 'firebase/storage'; // Correct import
import { Timestamp } from '@firebase/firestore';
import Swal from "sweetalert2";
const AddPost = (props) => {
  const [ShowModal, setShowModal] = useState(true);
  const [tabValue, settabValue] = useState(0);
  const [image, setimage] = useState([]);
  const [qustion, setqustion] = useState();
  const [qtnKey, setqtnKey] = useState();
  const [date, setdate] = useState(null);
  const [channelName, setchannelName] = useState('User Name');
  const [post, setpost] = useState([]);
  const [postKey, setpostKey] = useState([]);
  //const [imageUrl, setimageUrl] = useState([]);
  // const [imageName, setimageName] = useState([]);
  const navigate = useNavigate()
  const database = getDatabase(app)
  const Storage = getStorage(app); // Using Firebase Storage API correctly

  const TabsHandle = (event, newValue) => {
    settabValue(newValue)
    console.log("tabs values:", newValue)
  };

  useEffect(() => {

    console.log('input file is :', image)

  }, [image]);
  const pageHandler = () => {
    setShowModal(false)
    navigate('/')
  };

  const AddQuestion = () => {
    const qtnObj = {
      Question: qustion,
      Answer:'Not any answer here. Click on Answer button to add aswer'
    }
    const qtnRef = ref(database, '/Questions')
    const qtnPush = push(qtnRef)

    set(qtnPush, qtnObj)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Question',
          text: 'Question Add Successfylly',
          timer: 3000,

        })
        setqtnKey(qtnPush.key)
        console.log('qtnkey is :', qtnKey)
        navigate('/questionslist')
      })
      .catch(() => alert("Somthing Wrong please try again"))
  };
  //dat time 
  const calculateDateTime = () => {
    const timestamp = serverTimestamp()
    const currentTime = new Date().getTime(); // Get current time in milliseconds
    const postTime = new Date(timestamp).getTime(); // Get post time in milliseconds
    const elapsedTime = currentTime - postTime; // Calculate time difference in milliseconds

    // Convert milliseconds to seconds, minutes, hours, or days
    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let dateTimeString = '';
    if (days > 0) {
      dateTimeString = days === 1 ? '1 day ago' : `${days} days ago`;
    } else if (hours > 0) {
      dateTimeString = hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if (minutes > 0) {
      dateTimeString = minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else {
      dateTimeString = 'Just now';
    }

    setdate(dateTimeString); // Set the calculated date and time in the state variable
  };

  // Call the calculateDateTime function when the component mounts
  useEffect(() => {
    calculateDateTime();
  }, []);
  //Upload Image Code
  const AddPost = () => {
  console.log('post title', post);
  console.log('post image', image);
  const storageRef = sref(Storage, `/images/${image.name}`); // Use `sref` for Storage

  uploadBytes(storageRef, image)
    .then(() => {
      return getDownloadURL(storageRef); // Get download URL
    })
    .then((url) => {
      console.log('Image URL is:', url);

      const postObj = {
        Post: post,
        ImageUrl: url,
        DateTime: date,
        Comment: '',
        ChannelName: channelName,
      };
      const postRef = ref(database, '/Posts');
      const PostPush = push(postRef);
      set(PostPush, postObj)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Post',
            text: 'Post Add Successfylly',
            timer: 3000,
          });
          setpostKey(PostPush.key);
          console.log('postkey is:', postKey);
          navigate('/');
        })
        .catch(() => {
          throw new Error('Something went wrong');
        });
    })
    .catch((error) => {
      console.error('Something went wrong:', error);
    });
};

  return (
    <div className="">
      <h5>add post</h5>

      <Modal show={ShowModal} className="  " size="lg" onHide={pageHandler}>
        <Modal.Header className=" pb-0" closeButton>

          <Tabs
            className="mt-2 p-0 w-100"
            onChange={TabsHandle}
            value={tabValue}
            aria-label="tabs selection-follows"
            selectionFollowsFocus
            indicatorColor="primary" // Customize indicator color
            textColor="primary" // Customize text color
            centered // Center the tabs
          >
            <Tab className="w-50" label="Add question"></Tab>
            <Tab className="w-50" label="Create Post"></Tab>
          </Tabs>
        </Modal.Header>
        <Modal.Body>


          {tabValue === 0 && (
            <>
              <div style={{ height: "300px" }}>
                <Input className="text-break  word-break break-word" onChange={(e) => setqustion(e.target.value)} placeholder="Start Your question 'What', 'How, 'Why', etc." fullWidth required />

              </div>
              <hr />
              <div className="d-flex justify-content-end">
                <Button className=" rounded-5" onClick={pageHandler}>Cancel</Button>
                <Button className="rounded-5" onClick={AddQuestion} variant="contained">Add question</Button>

              </div>

            </>

          )}
          {tabValue === 1 && (
            <>
              <div style={{ height: "300px" }}>
                <div className="d-flex">
                  <Avatar className="me-2">{channelName[0]}</Avatar>
                  <TextField type="text" variant='standard' value={channelName} onChange={(e) => setchannelName(e.target.value)} id='channel name'></TextField>
                </div>
                <textarea onChange={(e) => setpost(e.target.value)} placeholder="Say Somthing add post title..." className="w-100 modaltext border-0  h-25" fullWidth required />


                {image && image.type && image.name ? (
                  <div className="" >

                    <img src={URL.createObjectURL(image)} alt={image.name} style={{ width: '80%', height: '230px' }} />
                  </div>
                ) : null
                }
              </div>
              <hr />
              <div className="d-flex" >
                <h5 className="mt-2 me-3 ms-1">Aa</h5>
                <Input type='file' id="hiddenFileInput" className="d-none " onChange={(e) => setimage(e.target.files[0])} />
                <IconButton onClick={() => document.getElementById("hiddenFileInput").click()}>
                  <PermMedia />
                </IconButton>
                <Button className="ms-auto rounded-5" onClick={AddPost} variant="contained">Post</Button>
              </div>
            </>
          )}


        </Modal.Body>

      </Modal>

    </div>
  )
};

export default AddPost;
