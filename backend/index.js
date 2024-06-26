import "dotenv/config";
import express, { response } from "express";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

const mongoDBURL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 10000;
// for HTTP server connection
const app = express();

// middleware for parsing req body
app.use(express.json());

// Middleware for CORS policy
// use cors(*)
const allowedOrigins = [
  "*",
  "http://localhost:5173", // Add your local frontend URL
  "https://book-store-using-mern-stack-8ewd.vercel.app",
  "https://book-store-using-mern-stack-8ewd.vercel.app/",
  "https://book-store-using-mern-stack-8ewd-j72p4noer-jayshree-s-projects.vercel.app",
  "https://book-store-using-mern-stack-8ewd-git-main-jayshree-s-projects.vercel.app",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
//or allow custom origins
// app.use(cors({
//     origin: '',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-type'],

// }));

app.get("/", (request, response) => {
  console.log(request);
  return response
    .status(200)
    .send("Welcome to the Bookstore web app using MERN stack");
});

app.use("/books", bookRoutes);

// to connect DB
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected successfully");
    // Express connection runs only if the DB connection is successful
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection error:", error);
  });
/*
Notes- Mongoose is a library that allows us to communicate with MongoDB  with JS easily
       Mongoose is a popular Object Data Modeling (ODM) library for MongoDB and Node.js.

       request and response are the objects provided by Express to handle the incoming request and send a response back to the client.
   
*/
