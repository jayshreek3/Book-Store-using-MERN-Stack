import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {useSnackbar} from 'notistack'

// states - 3 
const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const{id} = useParams();
  const {enqueueSnackbar} = useSnackbar();

  useEffect(()=>{
    setLoading(true);

    const apiURL = "https://book-store-using-mern-stack.onrender.com";

    axios
      .get(`${apiURL}/books/${id}`)
      .then((response) =>{
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      }).catch((error)=>{
        setLoading(false);
        //alert('An error occured, please check console log');
        enqueueSnackbar('Error', {variant: 'Error'})
        console.log(error);
      })
  },[])
  const handleEditBook = () => {

    const data = {
      title, author, publishYear
    };
    setLoading(true);
    const apiURL = "https://book-store-using-mern-stack.onrender.com";
    axios
      .put(`${apiURL}/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited Successfully', {variant: 'success'})
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', {variant: 'error'})
        //alert('An error occured. Please check the console')
        console.log(error);
      })
  }
  return (
    <div className='p-4'>
      <BackButton></BackButton>
      <h1 className='text-3xl my-4'>
        Edit Book
      </h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'></input>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input type='text' value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'></input>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input type='text' value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className='border-2 border-gray-500 py-2 w-full'></input>
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save</button>
      </div>
    </div>
  )
}

export default EditBook;