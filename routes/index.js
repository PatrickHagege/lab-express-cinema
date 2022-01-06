const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Movies = require("../models/Movie.model");

/* GET home page */
router.get('/', (req, res, next) => res.render('index'));

router.get('/movies', (req, res, next) => {
    Movies.find()
        .then((dbResponse) => {
                console.log("Database response:", dbResponse);
            res.render("movies.hbs", {
                movies: dbResponse
            });
        })
        .catch((e) => console.error(e));
});

router.get("/movies/:id", (req, res, next) => {
	console.log(req.params);
	const isValidId = mongoose.isValidObjectId(req.params.id);
	const id = req.params.id;
	if (isValidId) {
		Movies.findById(id)
			.then((movie) => {
				console.log(movie);
				res.render("movie.hbs", {
					movie
				});
			})
			.catch((e) => console.error(e));
	} else {
		next();
	}
});

module.exports = router;
