var express = require('express');
const axios = require('axios');
var router = express.Router();

const token =
  's9wIXPEyjElsCog64FGLRUsV7K2blBHzoOQwYM_I4R4OQR9jTkM46I3suCi6No885DaafsPoR-U0VrJ33lFU79wu8Zb1950z8sZoVwDhptEG8O-ep31GixxJh1Z3XXYx';

/* GET users listing. */
router.get('/search', function(req, res, next) {
  const limit = 5; // todo: change to 5, need top 5 results only
  return axios({
    url: 'https://api.yelp.com/v3/businesses/search',
    params: req.query,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(async response => {
      const { businesses } = response.data;
      const result = [];
      for (let i = 0; i < limit; i++) {
        const business = businesses[i];
        const reviewResponse = await axios({
          url: `https://api.yelp.com/v3/businesses/${business.id}/reviews`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        business.reviews = reviewResponse.data.reviews;

        result.push(business);
      }
      res.send(result);
    })
    .catch(err => {
      // console.log(err);
      res.status(err.response.status);
      console.log(err.response.data);
      res.send(err.response.data);
    });
});

module.exports = router;
