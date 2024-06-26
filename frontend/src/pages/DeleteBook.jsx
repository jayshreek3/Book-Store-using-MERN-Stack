import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {useSnackbar} from 'notistack'

function DeleteBook() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const {enqueueSnackbar} = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);

    const apiURL = "https://book-store-using-mern-stack.onrender.com";

    axios
      .delete(`${apiURL}/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/')
        enqueueSnackbar('Book Deleted Successfully', {variant: 'success'})
      }).catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', {variant: 'error'})
        //alert('An error occured while deleting the Book. Please check the logs for more details')
        console.log(error)
      })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>
        Delete a  Book
      </h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col iitem-center border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>

        <button className='p-2 bg-sky-300 m-8' onClick={handleDeleteBook}>Delete</button>
      </div>
    </div>
  )
}

export default DeleteBook