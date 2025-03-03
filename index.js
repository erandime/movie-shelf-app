import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "movies",
  password: "qwerty",
  port: 5432,
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
    res.render("movies.ejs");
});

app.get("/view", async (req, res) => {
    res.render("view.ejs");
});

app.post("/update", async (req, res) => {
    
});

app.post("/delete", async (req, res) => {
    
});

app.post("/add", async (req, res) => {
  try {
  const movie_name = req.body["movie_name"];
  const release_date = req.body["release_date"] || null;
  const overview = req.body["overview"] || null;
  const genre = req.body["genre"];
  const upload_image = req.body["upload_image"] || null;
  const rating = req.body["rating"] || null;
  const review = req.body["review"] || null;
  const watch_status = req.body["watch_status"];
  const watch_date = req.body["watch_date"] || null;

  const result = await db.query(
    "INSERT INTO movies (movie_name, release_date, overview, genre, upload_image, rating, review, watch_status, watch_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id",
    [movie_name, release_date, overview, genre, upload_image, rating, review, watch_status, watch_date] 
  );  
  // console.log(result.rows);
  res.redirect("/add");
  } catch (error) {
    console.log(error);
  }  
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});