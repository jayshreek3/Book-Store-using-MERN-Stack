import express, { response } from "express"
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";
import bookRoutes from "./routes/bookRoutes.js"
import cors from 'cors';

// for HTTP server connection
const app = express()

// middleware for parsing req body
app.use(express.json());

// Middleware for CORS policy
// use cors(*) 
app.use(cors());
//or allow custom origins
// app.use(cors({
//     origin: '',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-type'],

// }));

app.get('/', (request, response) => {
    console.log(request)
    return response.status(200).send('Welcome to the Bookstore web app using MERN stack');
});

app.use('/books', bookRoutes)

// to connect DB
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected successfully");
        // Express connection runs only if the DB con is successful
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })

/*
Notes- Mongoose is a library that allows us to communicate with MongoDB  with JS easily
       Mongoose is a popular Object Data Modeling (ODM) library for MongoDB and Node.js.

       request and response are the objects provided by Express to handle the incoming request and send a response back to the client.
   
*/