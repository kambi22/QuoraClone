import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Button, IconButton, Input } from "@mui/material";
import { get, getDatabase, ref, remove, update } from "firebase/database";
import { useEffect, useState } from "react"
import { Card, Col, Container, Modal, Row } from "react-bootstrap";
import app from "./firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { Player } from "@lottiefiles/react-lottie-player";
import followindLoader from './Lotties/followingLoader.json';
const MyPosts = () => {
  const [postData, setpostData] = useState([]);
  const [loading, setloading] = useState(true);
  const [toggle, settoggle] = useState(false);
  const [editPost, seteditPost] = useState('');
  const [editKey, setEditKey] = useState('');
  
  const navigate = useNavigate();
  const database = getDatabase(app);

  // Fetch user's posts
  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        setloading(true);
        const postsRef = ref(database, '/Posts/');
        const snapshot = await get(postsRef);
        if (snapshot.exists()) {
          const allPosts = snapshot.val();
          // Filter posts by current user (you'll need to implement user authentication)
          // For now, showing all posts - replace with actual user filtering
          setpostData(allPosts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load your posts'
        });
      } finally {
        setloading(false);
      }
    };

    fetchMyPosts();
  }, [database]);

  // Modal handler for editing posts
  const ModalHandlerd = (postContent = '', key = '') => {
    if (postContent && key) {
      seteditPost(postContent);
      setEditKey(key);
    }
    settoggle(!toggle);
  };

  // Delete post function
  const deletePost = async (key) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const postRef = ref(database, `/Posts/${key}`);
        await remove(postRef);
        
        // Update local state
        const updatedPosts = { ...postData };
        delete updatedPosts[key];
        setpostData(updatedPosts);

        Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      Swal.fire('Error!', 'Failed to delete post.', 'error');
    }
  };

  console.log('post data:', postData)
  // Update post function
  const updatePost = async () => {
    try {
      if (!editPost.trim()) {
        Swal.fire('Error!', 'Post content cannot be empty.', 'error');
        return;
      }

      const postRef = ref(database, `/Posts/${editKey}`);
      await update(postRef, {
        post: editPost,
        updatedAt: new Date().toISOString()
      });

      // Update local state
      const updatedPosts = {
        ...postData,
        [editKey]: {
          ...postData[editKey],
          post: editPost
        }
      };
      setpostData(updatedPosts);

      settoggle(false);
      seteditPost('');
      setEditKey('');
      
      Swal.fire('Success!', 'Post updated successfully.', 'success');
    } catch (error) {
      console.error("Error updating post:", error);
      Swal.fire('Error!', 'Failed to update post.', 'error');
    }
  };

  // Avatar background colors for cycling
  const bgColors = ['#17a2b8', '#007bff', '#ffc107', '#28a745'];
  const getAvatarColor = (index) => bgColors[index % bgColors.length];
console.log("post data", postData)
  return (
    <div>
      <Container>
         <Row className="mb-2 gap-" style={{ height: '400px', marginBottom:'100px' }}>
                  {!loading ? Object.entries(postData).reverse().map(([key, item], index) => (
                    <>
                      <Col key={key} className="mb-4" xs={12} sm={6} md={4} xl={3}>
                <Card className="shadow w-100 mt-3 h-100">
                  <Card.Header className="d-flex align-items-center">
                    <Avatar 
                      style={{ 
                        backgroundColor: getAvatarColor(index),
                        color: 'white'
                      }}
                      sizes="20"
                    >
                      {item.ChannelName ? item.ChannelName[0].toUpperCase() : 'U'}
                    </Avatar>
                    <h6 className="m-2 mb-0">{item.ChannelName || 'Unknown User'}</h6>
                  </Card.Header>
                  
                  
                    <Card.Body className="p-0" style={{ height: '200px' }}>
                      <img 
                        className="w-100 h-100" 
                        src={item.ImageUrl} 
                        alt="Post content"
                        style={{ objectFit: 'cover' }}
                      />
                    </Card.Body>
                  
                  <Card.Footer>
                    <p className="text-start mb-2">{item.Post || 'No content'}</p>
                    <div className="text-end">
                      <IconButton 
                        onClick={() => ModalHandlerd(item.post, key)}
                        color="primary"
                        size="small"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        onClick={() => deletePost(key)}
                        color="error"
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
                    </>
                  )) : (
                    <div className="">
                      <div className="mt-5">
                        <Player src={followindLoader} loop autoplay style={{ height: '200px', width: '200px' }} />
                      </div>
        
                      Loading...
                    </div>
        
        
                  )}
        
                </Row>

        {/* Edit Post Modal */}
        <Modal show={toggle} onHide={() => ModalHandlerd()} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <Input
                multiline
                rows={6}
                className="w-100"
                value={editPost}
                onChange={(e) => seteditPost(e.target.value)}
                placeholder="Edit your post content..."
                style={{ minHeight: '150px' }}
              />
            </div>
            <div className="d-flex justify-content-end gap-2">
              <Button 
                onClick={() => ModalHandlerd()} 
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <Button 
                onClick={updatePost} 
                variant="contained" 
                color="primary"
                disabled={!editPost.trim()}
              >
                Update Post
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default MyPosts;
