import { AutoStories, Campaign, Comment, MonetizationOn, NoteAlt, PeopleAlt, Person, QuestionAnswer, Subscriptions, ThumbUp, Update } from "@mui/icons-material";
import { Avatar, Button, IconButton, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react"
import { Card, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import app from "./firebase";
import { Player } from "@lottiefiles/react-lottie-player";
import loader from './Lotties/notifyloader.json'
const Notification = (props) => {
  const [QtnValue ,setQtnValue ] = useState([]);
  const [QtnData ,setQtnData ] = useState([]);
  const [ShowModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const database = getDatabase(app)
  const readData = async () => {
    try {
      const snapshot = await get(ref(database, 'Qustions/'))
      if (snapshot.exists()) {
        const qtnValue = snapshot.val()
        const questionsObj = {};
        Object.entries(qtnValue).forEach(([key, qtnData]) => {
          questionsObj[key] = qtnData.Question; // Store question text by key
        });
        setQtnValue(questionsObj);
        
      } else {
        console.log("data not found in database")
      }

    } catch (error) {
      console.error('Something went wrong: ', error);
    }
  };
  useEffect(()=>{
    readData()
  },[]);

  const ModalHandler  = (qtnData) => {
      setShowModal(!ShowModal)
      setQtnData(qtnData)
  };
  return (
       <div className=" text-center" >
        <Player className="text-center"  src={loader} loop autoplay style={{height:'400px',width:'400px'}}/>
        <h5>You don't have any notifications</h5>
        <p className="text-muted">you'll be notify once there any activity</p>
       <Container  className=" mt-5 ">
       {Object.entries(QtnValue).reverse().map(([key, questionText]) => (
        <>
          <Card className="shadow mt-2" key={key}>
            <Card.Header className="d-flex">
            <Avatar >s</Avatar>
            <Card.Title className="ms-2 mt-2">UserName</Card.Title>
            </Card.Header>
            <Card.Body className=" text-start" >
          <div >
            <h5>{questionText}?</h5>
          </div>
          <Button onClick={()=>{ModalHandler(questionText)}} className="rounded-5 mt-2" variant="contained">Answer</Button>

          </Card.Body>
         
          </Card>
          </>
         ))}

        <Modal show={ShowModal} onHide={ModalHandler} className="">
        <Modal.Header closeButton>
          <div className="d-flex ">
            <Avatar className="">S</Avatar>
            <h5 className="m-2">Satnam singh</h5>
          </div>
        </Modal.Header>
        <Modal.Body className=" p-0" >
          <h5 className="ms-2 me-1">{QtnData}</h5>
          <div className="" style={{ height: '300px' }}>
            <textarea className="w-100 h-100 p-2 border-0 modaltext " placeholder="Write you'r answer here..." />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="text-end" variant="contained" >Done</Button>
        </Modal.Footer>
      </Modal>
     
      </Container>
       </div>
     
   
    
  )
};

export default Notification;
