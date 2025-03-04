DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    movie_name VARCHAR(255) NOT NULL,
    release_date DATE,
    overview TEXT,
    genre VARCHAR(100)[] NOT NULL, 
    upload_image TEXT,
	rating INT,
	review TEXT,
	watch_status VARCHAR(20) NOT NULL,
	watch_date DATE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO movies (
  movie_name,
  release_date,
  overview,
  genre,
  upload_image,
  rating,
  review,
  watch_status,
  watch_date
) 
VALUES 
  ('Inception', '2024-11-07', 'A mind-bending thriller that explores the world of dreams and reality.', '{"Science Fiction", "Thriller"}', NULL, 1, 'A masterpiece that keeps you on the edge of your seat. Brilliantly executed!', 'Watched', NULL),
  ('Avengers: Endgame', NULL, NULL, '{"Action"}', NULL, 4, NULL, 'Currently Watching', NULL),
  ('Forrest Gump', '2002-12-29', 'The story of a man with a low IQ who unwittingly influences several historical events in the 20th century.', '{"Drama", "Romance"}', NULL, 1, NULL, 'Dropped It', NULL),
  ('Mad Max: Fury Road', NULL, NULL, '{"Action", "Adventure", "Science Fiction"}', NULL, 3, 'One of the best action films in recent years, with stunning visuals and nonstop action.', 'Watched', NULL),
  ('Squid Game', '2025-04-02', NULL, '{"Science Fiction"}', NULL, NULL, NULL, 'Waiting for Release', '2025-03-04'),
  ('The Godfather', '1996-01-30', 'A powerful crime saga about the Corleone family and their rise to power in the Mafia.', '{"Drama"}', 'movies.jpg', 5, NULL, 'Rewatching', NULL);

SELECT * FROM public.movies
ORDER BY id ASC ;