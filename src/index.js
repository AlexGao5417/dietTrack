import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import  { Provider }  from './dataContext/Context'

const app = (
  <Provider>
    <App />
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

