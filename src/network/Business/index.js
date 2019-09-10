import axios from 'axios';

const searchEndpoint = 'http://localhost:4000/business/search';

const findBusinesses = searchTerm => {
  return axios({
    url: searchEndpoint,
    params: {
      term: 'ice cream',
      location: 'alpharetta'
    }
  }).then(response => {
    console.log(response.data);
    return Promise.resolve(response.data);
  });
};

const getReviews = businessIds => {};

export { findBusinesses, getReviews };
