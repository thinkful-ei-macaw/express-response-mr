const express = require('express');
const app = express();
const playstore = require('./playstore');

// apps endpoint
app.get('/apps', (req, res) => {
  const { sort, genres } = req.query;
  let apps = [...playstore];

  if (sort) {
    if (sort === 'rating') {

      // sort in descending order of Rating
      apps.sort((a, b) => {
        if (a['Rating'] > b['Rating']) return -1;
        return 1;
      });

    } else if (sort === 'app') {

      // sort in ascending order of App
      apps.sort((a, b) => {
        if (a['App'] < b['App']) return -1;
        return 1;
      });

    } else {
      res.status(400).send(`'${sort}' provided for sort. Expected 'rating' or 'app'.`);
    }
  }

  if (genres) {
    const genreList = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];
    // Makes first letter capitalized and normalizes the rest
    const field = genres[0].toUpperCase() + genres.substring(1).toLowerCase();

    if (genreList.includes(field)) {
      apps = apps.filter(app => {
        return app['Genres'].includes(field);
      });
    }
    else {
      res.status(400).send(`'${genres}' provided for Genres. Expected one of [${genreList}].`);
    }
  }

  res.status(200).json(apps);
});

// start listening
app.listen('8080', () => console.log('Server live on :8080'));