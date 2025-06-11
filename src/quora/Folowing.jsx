import { Avatar, Button, Card } from "@mui/material";
import { get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import app from "./firebase";
import { Player } from "@lottiefiles/react-lottie-player";
import { RemoveItem } from "./Services/Action/action";
import followindLoader from './Lotties/followingLoader.json';
import Swal from "sweetalert2";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
const Following = (props) => {
  const [postDataList, setPostDataList] = useState([]);
  const database = getDatabase(app);
  const keys = useSelector(state => state.followitems.follows);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const postData = [];
      for (const key of keys) {
        const postRef = ref(database, `Posts/${key}`);
        try {
          const snapshot = await get(postRef);
          if (snapshot.exists()) {
            postData.push(snapshot.val());
          } else {
            console.log(`Post not found for key: ${key}`);
          }
        } catch (error) {
          console.error(`Error fetching data for key: ${key}`, error);
        }
      }
      setPostDataList(postData);
    };

    if (keys.length > 0) {
      fetchData();
    }
  }, [keys]);

  // Function to handle unfollowing
  function UnfollowHandler(key) {
    dispatch(RemoveItem(key));
    console.log('key is ', key);
    Swal.fire({
      icon: 'success',
      title: 'Unfollowed',
      toast: true,
      position: 'top-end',
      timer: 2000,
      showLoaderOnConfirm: true,
      showConfirmButton: false,
      timerProgressBar: true
    });
  }

  const AvtarBackground = ['bg-info', 'bg-primary', 'bg-warning', 'bg-success']
  return (
    <div>
      <Container className="mt-5" style={{marginBottom:'100px'}}>
        {keys.length > 0 ? (
          postDataList.length > 0 ? (
            postDataList.map((postData, index) => (
              <Card className="mt-2 shadow rounded-4" key={postData.id || index}>
                <div className="d-flex align-items-center m-3">
                  <Avatar className={`${AvtarBackground[index]}`} size='large'>{postData.ChannelName[0]}</Avatar>
                  <div className="ms-2">
                    <h5 className="m-0 p-0">{postData.ChannelName}</h5>
                    <p className="m-0 p-0 text-start">56 followers</p>
                  </div>
                  <Button className="ms-auto" id="unfollowButton" onClick={() => UnfollowHandler(postData.id)} >Unfollow</Button>
                </div>
              </Card>
            ))
          ) : (
            <div className="mt-5">
              <Player src={followindLoader} loop autoplay style={{ height: '200px', width: '200px' }} />
            </div>
          )
        ) : (
          <div className="">
            <Player src={'https://lottie.host/2c89ed4a-ea1e-404b-9cea-2caca9c067a5/sPXgSAxfPU.json'} style={{height:'300px'}} loop autoplay/>
          <h5 className="text-muted">Your have not followed any channel.</h5>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Following;