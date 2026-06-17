const connection = require("../data/db");

function index (req,res){

    console.log("INDEX ROUTER" + req.imagePath);

    const sql = "SELECT * FROM movies";

    connection.query(sql, (err, results)=>{

        if(err){
            return res.status(500).json({
                error: err.message,
                message: "Query failed"
            })
        }

        const movies = results;

        movies.forEach(movie => {

            movie.image = req.imagePath + movie.image
            
        });

        res.json(movies);

    })


}

function show(req, res){

    const {id} = req.params;

    const movieSQL = `
        SELECT *
        FROM movies
        WHERE id = ?
    `;

    const reviewsSQL = `
        SELECT id,name,vote, text
        FROM reviews
        WHERE movie_id = ?;
    `

    connection.query(movieSQL, [id], (err,results)=>{
        if(err){
            return res.status(500).json({
                error: err.message,
                message: "Query failed"
            })
        }

        const movie = results[0];

        if(!movie){
            return res.status(404).json({
                message: "Film con id " + id + " non trovato"
            })
        }

        movie.image = req.imagePath + movie.image;

        connection.query(reviewsSQL, [id], (err, results)=>{
            if(err){
                return res.status(500).json({
                    error: err.message,
                    message: "Query failed"
                })
            }

            const reviews = results;

            if(!reviews){
                return res.status(404).json({
                    message: "Non ci sono recensioni per questo film"
                })
            }

            res.status(200).json({
                ...movie,
                reviews
            })
        })
    })
    
}

module.exports = {index, show};