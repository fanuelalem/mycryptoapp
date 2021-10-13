import axios from 'axios';

const BASEURL = 'https://api.nomics.com/v1/currencies/ticker?key=62ad77ccd5104482cf8e02b09c4b100d8a9b1d5d&ids=';
 
export default {
  search: function (query) {
    return axios.get(BASEURL + query );
  },
};
