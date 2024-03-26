import { Comment, Share, ThumbDown, ThumbDownAltOutlined, ThumbDownAltRounded, ThumbUp, ThumbUpAltOutlined } from '@mui/icons-material';
import { IconButton, Button, Checkbox, TextField, Avatar, CircularProgress } from '@mui/material';
import { Database, get, getDatabase, ref, set, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Dropdown, Modal, ToggleButton, Container, Card, Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import app from './firebase';
import { Player } from '@lottiefiles/react-lottie-player';
import CircalLoader from './Lotties/loader.json'
const Comments = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [comment, setcomment] = useState('');
  const [ComtValue, setComtValue] = useState({});
  const [postData, setPostData] = useState(null);
  const [PostValue, setPostValue] = useState([]);
  const [params] = useSearchParams();
  const PostKey = params.get('key')
  const database = getDatabase(app)
  console.log('comments post key value is:', PostKey)

  const handleDialogOpen = () => {
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  useEffect(() => {
    const postRef = ref(database, `/Posts/${PostKey}`);
    get(postRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setPostData(snapshot.val());
          console.log('post data is ', snapshot.val())
        } else {
          console.log('Post not found');
        }
      })
      .catch((error) => console.error(error));
  }, []);
  const AddComments = () => {

    const cmtObj = {
      Comment: comment
    }

    const cmtRef = ref(database, `/Posts/${PostKey}`)
    update(cmtRef, cmtObj).then(() => {

      window.location.reload()
    }).catch((error) => console.log(error, 'error in comments'))
  };

  const readComment = async () => {
    try {
      const data = await get(ref(database, `/Posts/`));
      if (data.exists()) {

        const postObj = {}
        data.forEach((snapshot) => {
          const key = snapshot.key;
          const postText = snapshot.val();
          // Assign each property separately to the postObj
          postObj[key] = {
            Post: postText.Post,
            ImgUrl: postText.ImageUrl,
            DateTime: postText.DateTime,
            Comments: postText.Comment,
            channeName: postText.ChannelName
          };
        });

        setPostValue(postObj);
      } else {
        console.log("Comment data does not exist.");
      }
    } catch (error) {
      console.error('Error reading comment:', error);
    }
  };

  useEffect(() => {

    readComment();
  }, []);


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

  return (
    <div>


      <Container className=''>
      {postData ? (
        <Row className='mt-5' >
          
            <Col xl={8} md={12} >

              <Card className=' w-100 '>
                <Card.Body className='p-0 '>
                  <img className='h-100 w-100 m-0' src={postData.ImageUrl} alt="Post image" />

                </Card.Body>
                <Card.Footer className='text-start bg-white'>

                  <h3 >{postData.Post}</h3>


                  <div className="d-flex text-start">
                    <h5>Channel Name</h5>
                    <Button size='large' className='rounded-5 ms-3 me-5'  >Follow</Button>
                    <Checkbox className="" icon={<ThumbUpAltOutlined />} checkedIcon={<ThumbUp />} />
                    <Checkbox className="" icon={<ThumbDownAltOutlined />} checkedIcon={<ThumbDown />} />
                   
                    <IconButton onClick={SharePost} className='ms-2'>
                      <Share />
                    </IconButton>
                  </div>
                  <div className=" w-100">

                    <div className="d-flex ps-3 pt-3 pe-3 t-0">
                      <Avatar >S</Avatar>
                      <TextField className='w-100 ms-3' value={comment} onChange={(e) => setcomment(e.target.value)} type='text' size='medium' variant='standard' placeholder='Add your comments here'></TextField>

                    </div>
                    <div className='mb-3 text-end mt-0 me-3'>
                      <Button onClick={() => setcomment('')}>Cancel</Button>
                      <Button onClick={AddComments} variant='contained' className='rounded-5'>Comment</Button>
                    </div>

                    {Object.entries(PostValue).reverse().map(([key, commentText]) => (
                      <div className="text-start ms-3" key={key}>
                        <div className="d-flex align-items-center">
                          <Avatar>{commentText.channeName[0]}</Avatar>
                          <h5 className='ms-2'>{commentText.channeName}</h5>
                          <p className='m-3'>Just now</p>
                        </div>
                        <p className='ms-5 mt-0 pt-0'>{commentText.Comments}</p>
                        <div className="d-flex ms-5">
                          <Checkbox className="" icon={<ThumbUpAltOutlined />} checkedIcon={<ThumbUp />} />
                          <Checkbox className="" icon={<ThumbDownAltOutlined />} checkedIcon={<ThumbDown />} />


                          <Button className='rounded-5 text-black'>Reply</Button>
                        </div>
                      </div>
                    ))}


                    <div className="text-start ms-3">
                      <div className="d-flex  align-items-center">
                        <Avatar>M</Avatar>
                        <h5 className='ms-2'>Channel name</h5>
                        <p className='m-3'>Just now</p>
                      </div>
                      <p  className='ms-5' >This is my demo comment for my project post . i create this in my comments component</p>
                      <div className="d-flex ms-5">
                        <IconButton><ThumbUp /></IconButton>
                        <IconButton><ThumbDown /></IconButton>
                        <Button className='rounded-5 text-black'>Reply</Button>
                      </div>
                    </div>
                    <div className="text-start ms-3">
                      <div className="d-flex  align-items-center">
                        <Avatar>M</Avatar>
                        <h5 className='ms-2'>Channel name</h5>
                        <p className='m-3'>Just now</p>
                      </div>
                      <p className='ms-5'>This is my demo comment for my project post . i create this in my comments component</p>
                      <div className="d-flex ms-5">
                        <IconButton><ThumbUp /></IconButton>
                        <IconButton><ThumbDown /></IconButton>
                        <Button className='rounded-5 text-black'>Reply</Button>
                      </div>
                    </div>
                    <div className="text-start ms-3">
                      <div className="d-flex  align-items-center">
                        <Avatar>M</Avatar>
                        <h5 className='ms-2'>Channel name</h5>
                        <p className='m-3'>Just now</p>
                      </div>
                      <p className='ms-5'>This is my demo comment for my project post . i create this in my comments component</p>
                      <div className="d-flex ms-5">
                        <IconButton><ThumbUp /></IconButton>
                        <IconButton><ThumbDown /></IconButton>
                        <Button className='rounded-5 text-black'>Reply</Button>
                      </div>
                    </div>
                    <div className="text-start ms-3">
                      <div className="d-flex  align-items-center">
                        <Avatar>M</Avatar>
                        <h5 className='ms-2'>Channel name</h5>
                        <p className='m-3'>Just now</p>
                      </div>
                      <p className='ms-5'>This is my demo comment for my project post . i create this in my comments component</p>
                      <div className="d-flex ms-5">
                        <IconButton><ThumbUp /></IconButton>
                        <IconButton><ThumbDown /></IconButton>
                        <Button className='rounded-5 text-black'>Reply</Button>
                      </div>
                    </div>
                    <div className="text-start ms-3">
                      <div className="d-flex  align-items-center">
                        <Avatar>M</Avatar>
                        <h5 className='ms-2'>Channel name</h5>
                        <p className='m-3'>Just now</p>
                      </div>
                      <p className='ms-5'>This is my demo comment for my project post . i create this in my comments component</p>
                      <div className="d-flex ms-5">
                        <IconButton><ThumbUp /></IconButton>
                        <IconButton><ThumbDown /></IconButton>
                        <Button className='rounded-5 text-black'>Reply</Button>
                      </div>
                    </div>

                  </div>
                </Card.Footer>
              </Card>

            </Col>
            
          <Col className=''>
          <h5 className='p-3 text-start ' style={{ backgroundColor: 'lightgray' }}>Related more result s</h5>
          {Object.entries(PostValue).reverse().map(([key, data]) => (
            <Card className='mb-1 text-start' key={key}>
              <img className='h-100 w-100' src={data.ImgUrl} alt="pos images" />
              <h6 className='p-2 text-wrap'>{data.Post}</h6>
            </Card>
          ))}
        </Col>
         </Row>
          ) : (
            <Player src={CircalLoader} loop autoplay style={{height:'100px',width:'100px'}}/>
          )}




       
      </Container>

    </div>
  );
};

export default Comments;
