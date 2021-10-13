import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,HashRouter } from 'react-router-dom';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers/index';
import reduxThunk from 'redux-thunk';
import './index.css';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  { auth: { authenticated: localStorage.getItem('token')}},

  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
  <Router >
  <HashRouter>

  <App />
  </HashRouter>

</Router>

</Provider>,

  document.getElementById('root')
);


reportWebVitals();
