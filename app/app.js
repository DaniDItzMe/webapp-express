const express = require("express");
const cors = require("cors");

const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const imagePath = require("./middlewares/imagePath");

const moviesRouter = require("./routers/moviesRouter");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173"
}))

const port = process.env.PORT || 3333;

app.get("/", (req,res)=>{
    
    res.send("Applicazione in funzione");
})

app.use("/api/movies", imagePath, moviesRouter);

app.use(errorHandler);
app.use(notFound);

app.listen(port, () => {
    console.log("Server listening on port " + port);
});