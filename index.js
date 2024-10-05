const express = require('express');
const app = express();
const port = 3000;

// parse json using express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let movies = [
    {
        id: '1',
        title: 'Inception',
        director: 'Christopher Nolan',
        release_date: '2010-07-16'
    },
    {
        id: '2',
        title: 'The Irishman',
        director: 'Martin Scorsese',
        release_date: '2019-09-27'
    }
];

//get the movie list in the form of JSON
app.get('/movies', (req, res) => {
    res.json(movies);
});

//add movie to the list
app.post('/movies', (req, res) => {
    const movie = req.body;

    movies.push(movie);
    res.send('Movie is added to the list');
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

    res.status(404).send('Movie not found');
})

//remove a movie from the list
app.delete('/movies/:id', (req, res) => {
    const id = req.params.id;

    movies = movies.filter(movie => movie.id !== id);

    res.send('Movie is deleted');
})

//get the movie to listen at port
app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});