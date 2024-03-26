import { Avatar, Button, Card, CircularProgress } from "@mui/material";
import { get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react"
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import app from "./firebase";

const Bookmarks = (props) => {

  const [followItem,setfollowItem] = useState(null);
  const [postData, setPostData] = useState(null);
  const [keyData,setkeyData] = useState([]);
  const database = getDatabase(app);
  const keys = useSelector(state => state.followitems.follows);
  const [postDataList, setPostDataList] = useState([]);

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
  

  return (
    <div className="">
       <div className="">
       {postDataList.length > 0 ? (
        postDataList.map((postData, index) => (
          <div key={index}>
            <h2>{postData.Post}</h2>
            <img style={{height:'200px', width:'300px'}} src={postData.ImageUrl} alt="Post image" />
            <p>Likes: {postData.Like}</p>
            <p>Dislikes: {postData.Dislike}</p>
            <p>Posted: {postData.DateTime}</p>
          </div>
        ))
      ) : (
        <div className="mt-5">
          Loading...
        </div>
      )}
    </div>
    
    </div>
  )
};

export default Bookmarks;
