# Movie Shelf

Movie Shelf is a movie rating website that allows users to view, rate, and manage a collection of movies. 

## Features

- **Responsive Design**: The layout adapts to both larger and smaller screens:
  - For larger screens, a sidebar navigation is displayed.
  - For smaller screens, the top navigation is used for better accessibility.
  - Video is displayed for larger screens, while images are used for smaller screens.
  - Bootstrap and Media queries to ensure responsiveness for all elements across devices  
- **Star Rating**: Users can rate movies using a star rating system.  
- **CRUD Operations**: Users can Create, Read, Update, and Delete movie entries from the PostgreSQL database.  
- **Data Persistence**: Movie data is stored persistently in a PostgreSQL database.
- **Express/Node.js**: The server-side logic is built with Express.js and Node.js.  
- **EJS Templating**: Views are rendered dynamically using EJS (Embedded JavaScript templates).The header and footer are reusable components (header.ejs, footer.ejs).
- **Error Handling**: Error handling is implemented to ensure smooth user experience even when things go wrong.
- **ARIA Labels**: Accessibility is ensured with ARIA labels for screen readers.

## Prerequisites

Before getting started, make sure you have the following installed:

- [Node.js]
- [PostgreSQL]
- [Git]

## Installation

1. Clone the repository:

```bash
git clone https://github.com/erandime/movie-shelf-app.git
cd movie-shelf-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up PostgreSQL database. The database.sql provides an example of setting up database called "movies" used for this project.

4. Configure environment variables:
Create a .env file at the root of the project.
Add the following:

DB_HOST=localhost
DB_PORT=5432
DB_USER=your-db-username
DB_PASSWORD=your-db-password
DB_NAME=your-db-name

5. Start the development server:

```bash
node index.js
```
6. Visit http://localhost:3000 in your browser to access the app.
