import { AutoStories, Campaign, Comment, Delete, Edit, ExpandMore, MonetizationOn, NoteAlt, PeopleAlt, Person, QuestionAnswer, Subscriptions, ThumbUp, Update } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, IconButton, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { get, getDatabase, push, ref, remove, set, update } from "firebase/database";
import React, { useEffect, useState } from "react"
import { Card, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import app from "./firebase";
import { Player } from "@lottiefiles/react-lottie-player";
import { GridLoader, PropagateLoader, SyncLoader } from "react-spinners";
import commetLoader from './Lotties/commentLoader.json'
import Swal from "sweetalert2";
import shadows from "@mui/material/styles/shadows";
const Answers = (props) => {
  const [QtnValue, setQtnValue] = useState([]);
  const [AnsValue, setAnsValue] = useState([]);
  const [Data, setData] = useState([]);
  const [QtnData, setQtnData] = useState([]);
  const [ShowModal, setShowModal] = useState(false);
  const [ansupModel ,setansupModel ] = useState(false);
  const [QtnKey, setQtnKey] = useState([]);
  const [answerKey, setanswerKey] = useState('');
  const [Answer, setAnswer] = useState([]);
  const [loading, setloading] = useState();
  const [IsOnline, setIsOnline] = useState(navigator.onLine);


  const navigate = useNavigate();
  const database = getDatabase(app)

  useEffect(() => {
    const GetQuestion = async () => {
      try {
        const QtnResponse = await get(ref(database, '/Questions/'))
        if (QtnResponse.exists) {
          const qtnObj = {}
          QtnResponse.forEach((snapshot) => {
            const key = snapshot.key
            const qtnText = snapshot.val()
            setloading(qtnText)
            qtnObj[key] = {
              question: qtnText.Question,
              answer: qtnText.Answer
            }
          })
          setQtnValue(qtnObj)
        } else {
        }
      } catch (error) {
        console.log("somthig wrong comming error")
      }
    }
    GetQuestion()
  }, [])


  const ModalHandler = (keyValue, qtnData) => {
    setShowModal(!ShowModal)
    setQtnData(qtnData)
    setQtnKey(keyValue)
  };
  const AnsUpdateModal = (keyValue, qtnData, ansData) => {
    setansupModel(!ansupModel)
    setQtnKey(keyValue)
    setQtnData(qtnData)
    setAnswer(ansData)
  };

  // State for answer list

  const AddAnswer = () => {
    const answerObj = {
      Answer: Answer,
    };
    const refs = ref(database, `Questions/${QtnKey}/`);
    update(refs, answerObj) // Set the answer object to Firebase
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Add',
          text: 'Your Answer Added Successfully',
          timer: 4000,
          showConfirmButton: true
        })
        window.location.reload()
      })
      .catch(() => alert('Something went wrong while adding the answer'));
  };
  const deleteAnswer = (key) => {
    const deleteObj = {
      Answer: 'Not any answer added here'
    };
    const delRef = ref(database, `Questions/${key}/`);
    update(delRef, deleteObj) // Set the answer object to Firebase
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Delete',
          text: 'Your Answer Deleted Successfully',
          timer: 4000,
          showConfirmButton: true
        })
        window.location.reload()
      })
      .catch(() => alert('Something went wrong while deleting the answer'));
  };


  const UpdateAnswer = (keyValue) => {
    console.log('update answer key', keyValue)
    setShowModal(!ShowModal)
  };

  return (
    <div className=" " >

      <Container className=" mt-5 mb-5">
        {IsOnline && loading ? (
          Object.entries(QtnValue).reverse().map(([key, item]) => (

            <>
              <Card className="shadow mt-2" key={key}>
                <Card.Header className="d-flex">
                  <Avatar className="" >S</Avatar>
                  <Card.Title className="ms-2 mt-2">UserName</Card.Title>
                </Card.Header>
                <Card.Body className=" text-start" >
                  <div >
                    <h5>{item.question}?</h5>
                  </div>
                  <Button onClick={() => { ModalHandler(key, item.question) }} className="rounded-5 mt-2" variant="contained">Answer</Button>
                </Card.Body>
                <Card.Footer>
                  <Accordion key={key}   >
                    <AccordionSummary style={{ backgroundColor: '#FAFAFA' }} expandIcon={<ExpandMore />} id="fist" aria-controls="fist-content">Answer</AccordionSummary>
                    <AccordionDetails className="text-start d-flex">
                      <div className="">
                        <h5 className=" text-wrap">{item.answer}</h5>
                       <div className="">
                       <IconButton onClick={() => {AnsUpdateModal(key, item.question,item.answer) }}   ><Edit /></IconButton>
                        <IconButton onClick={() => deleteAnswer(key)}><Delete /></IconButton>
                       </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </Card.Footer>

              </Card >

            </>
          ))
        ) : (
          <div className="mt-3">
            <Player src={commetLoader} speed={0.8} loop autoplay style={{ height: '300px', width: '300px' }} />
          </div>
        )}
      
      
      
        <Modal show={ShowModal} size='lg' onHide={ModalHandler} className="">
          <Modal.Header closeButton>
            <div className="d-flex ">
            <h5 className="m-2">Add Answer</h5>
            </div>
          </Modal.Header>
          <Modal.Body className=" p-0 p-2" >
            <h5 className="ms-2 me-1">{QtnData} ?</h5>
            <div className="" style={{ height: '300px' }}>
              <textarea onChange={(e) => setAnswer(e.target.value)} className="w-100 h-100 p-2 border-0 modaltext " placeholder="Write you'r answer here..." />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={AddAnswer} className="text-end" variant="contained" >Done</Button>
          </Modal.Footer>
        </Modal>




        <Modal show={ansupModel} size='lg' onHide={AnsUpdateModal} className="">
          <Modal.Header closeButton>
            <div className="d-flex ">
              
              <h5 className="m-2">Edit Answer</h5>
            </div>
          </Modal.Header>
          <Modal.Body className=" p-0 p-2" >
            <h5 className="ms-2 me-1">{QtnData} ?</h5>
            <div className="" style={{ height: '300px' }}>
              <textarea value={Answer} onChange={(e) => setAnswer(e.target.value)} className="w-100 h-100 p-2 border-0 modaltext " placeholder="Write you'r answer here..." />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={AddAnswer} className="text-end" variant="contained" >Done</Button>
          </Modal.Footer>
        </Modal>

      </Container>

    </div >

  )
};

export default Answers;
