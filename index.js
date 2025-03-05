import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.get("/add", async (req, res) => {
    res.render("add.ejs");
});

app.get("/movies", async (req, res) => {
  try {
    const result = await db.query("SELECT id, movie_name, genre, rating FROM movies ORDER BY id ASC;"  );
    let movies = [];
    result.rows.forEach((movie) => {
    movies.push({
      id: movie.id,
      movie_name: movie.movie_name,
      genre: movie.genre,
      rating: movie.rating ? movie.rating : 0
    });
  });
  res.render("movies.ejs", {movies});
  } catch (error) {
    console.log("Database query failed", error);
    res.status(500).send("There was an error fetching the movies. Please try again later."); //Display error in future version
  }  
});

app.get("/view/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query(
      "SELECT movie_name, release_date, overview, genre, upload_image, rating, review, watch_status, watch_date FROM movies WHERE id = $1;",
      [id]
    );
    const movie = result.rows[0];
    
    res.render("view.ejs", {
      id,
      movie_name: movie.movie_name,
      release_date: movie.release_date,
      overview: movie.overview,
      genre: movie.genre,
      upload_image: movie.upload_image,
      rating: movie.rating,
      review: movie.review,
      watch_status: movie.watch_status,
      watch_date: movie.watch_date,
    });

  } catch (error) {
    console.log("Database query failed", error);
    res.status(500).send("There was an error fetching the movie. Please try again later.");
  }  
});

app.post("/update", async (req, res) => {
  const id = req.body.id;
  const movie_name = req.body["movie_name"];
  const release_date = req.body["release_date"] || null;
  const overview = req.body["overview"] || null;
  const genre = req.body["genre"];
  const upload_image = req.body["upload_image"] || null;
  const rating = req.body["rating"] ? parseInt(req.body["rating"]) : null;
  const review = req.body["review"] || null;
  const watch_status = req.body["watch_status"];
  const watch_date = req.body["watch_date"] || null;
  
  try {
    const result = await db.query(
    "UPDATE movies SET movie_name = $1, release_date = $2, overview = $3, genre = $4, upload_image = $5, rating = $6, review = $7, watch_status = $8, watch_date = $9 WHERE id = $10",
    [movie_name, release_date, overview, genre, upload_image, rating, review, watch_status, watch_date, id] 
  );  
        
    return res.render("view.ejs", { id, movie_name, release_date, overview, genre, upload_image, rating, review, watch_status, watch_date});
  } catch (error) {
    console.log("Database query failed", error);
    res.status(500).send("Error in update. Please Try again later.");
  }  
});

app.post("/add", async (req, res) => {
    const movie_name = req.body["movie_name"];
    const release_date = req.body["release_date"] || null;
    const overview = req.body["overview"] || null;
    const genre = req.body["genre"];
    const upload_image = req.body["upload_image"] || null;
    const rating = req.body["rating"] ? parseInt(req.body["rating"]) : null;
    const review = req.body["review"] || null;
    const watch_status = req.body["watch_status"];
    const watch_date = req.body["watch_date"] || null;  

  try {
  const result = await db.query(
    "INSERT INTO movies (movie_name, release_date, overview, genre, upload_image, rating, review, watch_status, watch_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id",
    [movie_name, release_date, overview, genre, upload_image, rating, review, watch_status, watch_date] 
  );  
    console.log("Added new movie:", result.rows[0].id);
    res.render("view.ejs", {
      id: result.rows[0].id,
      movie_name, release_date, overview, genre, upload_image, rating, review, watch_status, watch_date
    });
  } catch (error) {
    console.log("Database query failed", error);
    res.status(500).send("There was an error adding the movie. Please try again later.");
  }  
});

app.post("/delete", async (req, res) => {
  const id = req.body.id;
  try {
    const result = await db.query("DELETE FROM movies WHERE id = $1;",
      [id]
    );
    
    res.redirect("/movies");
  } catch (error) {
    console.log("Database query failed", error);
    res.status(500).send("There was an error deleting the movie. Please try again later.");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});