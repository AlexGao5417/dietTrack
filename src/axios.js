const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://trackapi.nutritionix.com/v2',
  timeout: 5000,
  headers: 
    {'x-app-id': 'f4865c46',
     'x-app-key': '275d49eab16075bc9022e163c7c218b7',
    'x-remote-user-id': '0'}
});


module.exports = instance