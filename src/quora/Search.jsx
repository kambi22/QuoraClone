import React, { useEffect, useState } from 'react';
import { IconButton, Checkbox, Typography, Button, TextField } from '@mui/material';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Player } from '@lottiefiles/react-lottie-player';
import searchicon from './Lotties/searloader.json'
import { get, getDatabase, ref } from 'firebase/database';
import app from './firebase';
import { useSearchParams } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import { ThumbUp } from '@mui/icons-material';
const Search = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filtered, setfiltered] = useState([]);
  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [Input] = useSearchParams()

  const searchValue = Input.get('searched')
  const database = getDatabase(app)
  console.log('searched dara f', searchValue)
  const handleDialogOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDialogClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const refrence = await get(ref(database, '/Questions'))
        if (refrence.exists) {
          const value = refrence.val()
          const data = Object.values(value)

          setDatas(data)

          setDatas(data)
          console.log("datas length", datas.length)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchValue.trim() !== '') {
      const filtere = datas.filter(question =>
        question.Question.toLowerCase().includes(searchValue.toLowerCase())
      );
      setfiltered(filtere);
      console.log('filterd data is :', filtered)
    } else {
      setfiltered([]);
    }
  }, [searchValue, datas]);

const handle = (key) => {
    console.log('hand ok is :',key)
};
  return (
    <div>
      {filtered.length > 0 ? (
        <Container className='mt-5'>
          {Object.values(filtered).map((item, i) => (
            <Card className='shadow mt-2'>
              <Card.Header className='text-start'>
                <h5>{item.Question} ?</h5>
              </Card.Header>
              <Card.Body className='text-start'>
                <h6>{item.Answer}</h6>
              </Card.Body>
             
            </Card>
          ))}
        </Container>
      ) : (
        <div className="">
          <Player src={searchicon} style={{ height: '400px', width: '400px' }} loop autoplay />
          <h3><strong className='text-muted text-bolder'>Sorry Data Not Found</strong></h3>

        </div>
      )} 
          




    </div>
  );
};

export default Search;
