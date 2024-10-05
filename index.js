const express = require('express');
const uuid = require('uuid');
const app = express();
const port = 3000;

// parse json using express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let movies = [
    {
        id: '55f6175d-6e2b-4f09-8167-92845387cdb7',
        title: 'Inception',
        director: 'Christopher Nolan',
        release_date: '2010-07-16'
    },
    {
        id: '8c17b92a-f0ef-4c10-ac09-083c10617424',
        title: 'The Irishman',
        director: 'Martin Scorsese',
        release_date: '2019-09-27'
    }
];

//get the movies list in the form of JSON
app.get('/movies', (req, res) => {
    res.json(movies);
});

// search for a movie in the list
app.get('/movies/:id', (req, res) => {
    const id = req.params.id;
    for (let movie of movies) {
        if (movie.id === id) {
            res.json(movie);
            return;
        }
    }
    res.status(400).send('Movie not found');
})

//add movie to the list
app.post('/movies', (req, res) => {
    const movie = {
        id: uuid.v4(),
        title: req.body.title,
        director: req.body.director,
        release_date: req.body.release_date
    };
    if (!movie.title || !movie.director || !movie.release_date) {
        return res.status(400).send('Please fill all the fields');
    }
    movies.push(movie);
    res.json({msg: 'Movie is added to the list', movies});
});

//update movie record
app.put('/movies/:id', (req, res) => {
    const found = movies.some(movie => movie.id === req.params.id);
    if (found) {
        const updateMovie = req.body;
        movies.forEach(movie => {
            if (movie.id === req.params.id) {
                movie.title = updateMovie.title ? updateMovie.title : movie.title;
                movie.director = updateMovie.director ? updateMovie.director : movie.director;
                movie.release_date = updateMovie.release_date ? updateMovie.release_date : movie.release_date;
                res.json({msg: 'Movie updated', movie});
            }
        });
    } else {
        res.sendStatus(400).send('Movie not found');
    }
});

//remove a movie from the list
app.delete('/movies/:id', (req, res) => {
    const id = req.params.id;
    const found = movies.some(movie => movie.id === id);
    if (!found) {
        return res.status(400).send('Movie not found');
    }
    movies = movies.filter(movie => movie.id !== id);
    res.json({msg: 'Movie is deleted', movies});
})

//get the movie to listen at port
app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});