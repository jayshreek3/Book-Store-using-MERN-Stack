import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();
// to save a new book
router.post('/', async (request, response) => {
    try {

        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            response.status(400).send('Missing fields') // status(400).send({message : 'Send all reqd feilds'})
        }

        // var for newBook
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };

        const book = await Book.create(newBook);

        response.status(201).send(book); // 201 = successful POST request that creates a new record in a database.

    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message }); // 500 = internal server error
    }
})

// to GET all the books
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({})
        response.status(200).json({
            count: books.length,
            data: books
        });

    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message });

    }
});

// to GET book by id
router.get('/:id', async (request, response) => { // : denotes a route paramter
    try {
        const { id } = request.params; //request.params: This is an object containing properties mapped to the named route parameters.
        const book = await Book.findById(id) //findById is a method provided by Mongoose, which is an ORM (Object-Relational Mapping) library for MongoDB
        response.status(200).json(book);

    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message });

    }
});

// Update a Book
router.put('/:id', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send('All fields are required to proceed') // status(400).send({message : 'Send all reqd feilds'})
        }

        const { id } = request.params
        const result = await Book.findByIdAndUpdate(id, request.body)
        if (!result) {
            return response.status(400).json({ message: 'Book not found' })
        }

        response.status(200).send({ message: 'Book updated successfully' })
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message });
    }
})

//to delete a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id)
        if (!result) {
            return response.status(404).json({ message: 'Book not found' })
        }
        response.status(200).send({ message: 'Book Deleted successfully' })

    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message });
    }
})

export default router;
