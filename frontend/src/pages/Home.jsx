import React, { useState, useEffect } from 'react'; //hooks (useState, useEffect)
import axios from 'axios';  // Imports axios library for making HTTP requests
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom'; // Imports Link component for navigation within the React app
import { AiOutlineEdit } from 'react-icons/ai' // imports icon
import { BsInfoCircle } from 'react-icons/bs' // Imports BsInfoCircle icon (used for details link)
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md' //Imports MdOutlineAddBox (add) and MdOutlineDelete (delete) icons
import BooksTable from '../components/home/BooksTable'
import BooksCard from '../components/home/BooksCard'

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false); //Single Page loading set to false
    const [showType, setShowType] = useState('table');

    useEffect(() => { // Defines a React hook 'useEffect' for side effects (data fetching)
        setLoading(true); // Sets loading to true to display a spinner while fetching data
        
        const apiURL = "https://book-store-using-mern-stack.onrender.com";

        axios
            .get(`${apiURL}/books`) //GET request from the backend API
            .then((response) => {
                setBooks(response.data.data); // we have 2 ptops in BS for Book- count and data
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, []);
    return (
        <div className='p-4'>
  <div className='flex justify-center items-center'> {/* Single flex container */}
    <button className='bg-sky-300 hover:bg-sky-600 px-4 py-2 rounded-lg mr-4' onClick={() => setShowType('table')}>Table</button>
    <button className='bg-sky-300 hover:bg-sky-600 px-4 py-2 rounded-lg' onClick={() => setShowType('card')}>Card</button>
  </div>
  <div className='flex justify-between items-center'> {/* Separate flex container for title and button */}
    <h1 className='text-3xl my-8'>
      Books List
    </h1>
    <Link to='/books/create'>
      <MdOutlineAddBox className='text-sky-800 text-4xl' />
    </Link>
  </div>

  {loading ? (
    <Spinner />
  ) : showType === 'table' ? (
    <BooksTable books={books} />
  ) : (
    <BooksCard books={books} />
  )}
</div>

    )
}

export default Home