import { Delete, Edit, Height } from "@mui/icons-material";
import { Avatar, Button, Container, IconButton, Input, Skeleton, TextField } from "@mui/material";
import { get, getDatabase, ref, remove, update } from "firebase/database";
import React, { useEffect, useState } from "react"
import { Card, Col, Modal, Row } from "react-bootstrap";
import app from "./firebase";
import { Player } from "@lottiefiles/react-lottie-player";
import loader from './Lotties/loader.json'
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
const MyPosts = (props) => {
  const [postData, setpostData] = useState([]);
  const [loading, setloading] = useState(); // Initialize loading state as true
  const [toggle, settoggle] = useState(false);
  const [postKey, setpostKey] = useState();
  const [editPost, seteditPost] = useState('');
  const navigate = useNavigate();
  const database = getDatabase(app)

  useEffect(() => {
    const readPost = async () => {
      try {
        const dataref = ref(database, '/Posts');
        const snapshot = await get(dataref);
        if (snapshot.exists()) {
          const obj = {};
          snapshot.forEach((data) => {
            const value = data.val();
            const key = data.key;
            setloading(value);
            obj[key] = {
              post: value.Post,
              img: value.ImageUrl,
              channelname: value.ChannelName
            };
          });
          setpostData(obj);
        } else {
          console.log('data not found');
        }
      } catch (error) {
        console.error('error', error);
      }
    };

    // Call the readPost function here
    readPost();
  }, []);

  const ModalHandlerd = (postText, key) => {
    settoggle(!toggle)
    console.log('modal key is ', key)
    console.log('modal key is ', postText)
    seteditPost(postText)
    setpostKey(key)
  };

  const updatePost = () => {

    const edit = {
      Post: editPost
    }
    const postref = ref(database, `/Posts/${postKey}`)

    update(postref, edit).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Post',
        text: 'Post Add Successfylly',
        timer: 3000,

      })
      navigate('/')
    }).catch((error) => console.error('error', error))

  }

  const deletePost = (key) => {

    Swal.fire({
      icon: 'success',
      title: 'Post',
      text: 'Post Add Successfylly',
      timer: 3000,
      showConfirmButton: true

    })
    const postref = ref(database, `/Posts/${key}`)

    remove(postref).then(() => {

      window.location.reload()
      console.log('delete post ')
    }).catch((error) => console.error('error', error))
  };
  return (
    <div>

      <Container className="mt-5" >
        <Row className=" w-100 " style={{ height: '300px' }}>
          {loading ? (
            Object.entries(postData).reverse().map(([key, item]) => (

              <Col className="mt-3 w-100" key={key} xs={12} sm={8} md={6} xl={4} >
                <Card className="shadow w-100 mt-3 h-100">
                  <Card.Header className="d-flex " >
                    <Avatar  >S</Avatar>
                    <h5 className="m-2">{item.channelname}</h5>
                  </Card.Header>
                  <Card.Body className="d-flex p-0" style={{height:'200px'}} >

                    <img className="w-100 h-100 p-0" src={item.img} alt="image" />

                  </Card.Body>
                  <Card.Footer>
                    <h5 className="text-start">{item.post}</h5>
                    <div className="text-end ">
                      <IconButton onClick={() => ModalHandlerd(item.post, key)} ><Edit /></IconButton>
                      <IconButton onClick={() => deletePost(key)}><Delete /></IconButton>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>

            ))
          ) : (
          
            <Container className="mt-5" >
            <Row className=" w-100 " style={{ height: '350px' }}>
            {Object.entries(postData).reverse().map(([key, item]) => (
                  <Col className="mt-3" >

                    <div className="d-flex" >
                      <Skeleton animation='wave' variant='circular' height={40} width={40} />
                      <Skeleton animation='wave' className="w-75 ms-2 mt-1" variant='rectangular' height={30} />
                    </div>
                    <div className="d-flex mt-2">
                      <Skeleton style={{ height: '350px' }} animation='wave' variant='rectangular' className="w-100" height={200} />
                    </div>
                    <div>
                      <Skeleton animation='wave' variant="rectangular" className="w-50 mt-2" height={30} />
                    </div>
                  </Col>
               
            ))}
          </Row>

          </Container>
          )}
        </Row>
        <Modal show={toggle} onHide={ModalHandlerd}  >
          <Modal.Header closeButton>
            <h5>Edt Post</h5>
          </Modal.Header>
          <Modal.Body >
            <div className="w-100" style={{ height: '300px' }}>
              <Input className="w-100" value={editPost} onChange={(e) => seteditPost(e.target.value)}   ></Input>
            </div>

            <div className="justify-content-end d-flex ">
              <Button onClick={updatePost} variant="contained" className="rounded-5 " >Done</Button>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  )
};

export default MyPosts;
