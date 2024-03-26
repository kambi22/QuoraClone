import { Delete, DirectionsBusFilled, Edit } from "@mui/icons-material";
import { Avatar, Button, Container, IconButton, Input } from "@mui/material";
import { get, getDatabase, ref, remove, update } from "firebase/database";
import React, { useEffect, useState } from "react"
import { Card, Modal } from "react-bootstrap";
import app from "./firebase";
import { Player } from "@lottiefiles/react-lottie-player";
import Swal from "sweetalert2";


const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [ShowModal, setShowModal] = useState(false);
  const [Editqtn, setEditqtn] = useState('');
  const [selectedQuestionKey, setSelectedQuestionKey] = useState('');
  const database = getDatabase(app);

  const ModalHandler = (Edtqtn, QtnKey) => {
    setShowModal(!ShowModal)
    setEditqtn(Edtqtn)
    setSelectedQuestionKey(QtnKey)
    console.log('question item ;', Editqtn)
    console.log('question key ;', selectedQuestionKey)
  };

  const readData = async () => {
    try {
      const snapshot = await get(ref(database, 'Questions/'))
      if (snapshot.exists()) {
        const qtnValue = snapshot.val()
        
        const questionsObj = {};
        Object.entries(qtnValue).forEach(([key, qtnData]) => {
          questionsObj[key] = qtnData.Question; // Store question text by key
        });
        setQuestions(questionsObj);
        console.log('question list', questions)
      } else {
        console.log("data not found in database")
      }

    } catch (error) {
      console.error('Something went wrong: ', error);
    }
  };

  useEffect(() => {
    readData();
  }, []); // Empty dependency array to run once on mount

  const UpdateQuestion = () => {
    const qtnObj = {
      Question: Editqtn
    }
    const questionRef = ref(database, 'Questions/' + selectedQuestionKey);
    update(questionRef, qtnObj).then(() => {
      Swal.fire({
        icon:'success',
        title:'Updated',
        text:'Question Update Successfully',
        timer:4000,
        showConfirmButton:true
      })
      window.location.reload()
    }).catch((error) => console.error('error', error))
  };

  const RemoveQuestion = (removeKey) => {
      const qtnRef = ref(database, 'Questions/' + removeKey)

      remove(qtnRef).then(()=>{
        Swal.fire({
          icon:'success',
          title:'Delete',
          text:'Question deleted Successfully',
          timer:4000,
          showConfirmButton:true
        })
        window.location.reload()
      }).catch((error)=>console.log("error",error))

  };

  return (
    <div>
      <Container className="mt-5 mb-5">
        {Object.entries(questions).reverse().map(([key, questionText]) => (
          <>
            <Card className="shadow mt-2" key={key}>
              <Card.Header >
                <div className="d-flex align-items-center">
                  <Avatar className="">S</Avatar>
                  <div className=" ms-2">
                    <h5 className="m-0 p-0">Satnam singh</h5>
                    <p className="m-0 text-start p-0">2 hour ago</p>
                  </div>
                </div>
              </Card.Header>
              <Card.Body className="d-flex">
                <div className="text-start">
                <h5>{questionText}?</h5>
                </div>
                <div className="ms-auto">

                  <IconButton onClick={() => ModalHandler(questionText, key)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={()=>RemoveQuestion(key)} ><Delete /></IconButton>
               
                </div>
              </Card.Body>
              <div>
              </div>
            </Card>

          </>
        ))}
        <Modal show={ShowModal} size="lg" onHide={ModalHandler} >
          <Modal.Header className="" closeButton><h5>Edit Question</h5></Modal.Header>
          <Modal.Body >
            <div className="w-100" style={{ height: '300px' }}>
              <Input className="w-100" value={Editqtn} onChange={(e) => setEditqtn(e.target.value)}   ></Input>
            </div>
            <div className="justify-content-end d-flex ">
              <Button onClick={UpdateQuestion} variant="contained" className="rounded-5 " >Done</Button>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default QuestionsList;

