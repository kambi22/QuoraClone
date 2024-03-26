import { Delete, Edit, Height } from "@mui/icons-material";
import { Avatar, Button, Container, IconButton, Input, Skeleton,  } from "@mui/material";
import { get, getDatabase, ref, remove, update } from "firebase/database";
import React, { useEffect, useState } from "react"
import { Card, Col, Modal, Row } from "react-bootstrap";
import app from "./firebase";
import { Player } from "@lottiefiles/react-lottie-player";
import loader from './Lotties/loader.json'
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Language = (props) => {
  const [answer ,setanwser ] = useState([]);
  const database = getDatabase(app)
  const [PostValue, setPostValue] = useState([]);

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
        console.log("postvalueis is",PostValue)
        console.log("postvalueis is",PostValue.length)
      } else {
        // Handle case where no posts exist
      }
    } catch (error) {
      console.log("Something went wrong:", error);
    }
  };
  useEffect(() => {
    readPost()
  }, []);

  return (
    <div>
      <Container className="mt-5" >
        <Row className=" w-100 " style={{ height: '350px' }}>
                {Object.entries(PostValue).reverse().map(([key, item]) => (
              <Col className="mt-3"  xs={12} sm={8} md={6} xl={4} >
                  <div className="d-flex" >
                    <Skeleton animation='wave' variant='circular' height={40} width={40} />
                    <Skeleton animation='wave' className="w-75 ms-2 mt-1" variant='rectangular' height={30}  />
                  </div>
                  <div className="d-flex mt-2">
                    <Skeleton animation='wave' variant='rectangular' className="w-100" height={200} />
                  </div>
                  <div>
                    <Skeleton animation='wave' variant="rectangular" className="w-50 mt-2" height={30}/>
                  </div>
            
              </Col>
))}
        </Row>    
      </Container>
  
    </div>
  )
};

export default Language;
