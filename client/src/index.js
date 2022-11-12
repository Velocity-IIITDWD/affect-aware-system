import React from 'react';
import { render } from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/jquery/src/jquery';

const root = document.getElementById('root');
render(
  <CookiesProvider>
      <App />
  </CookiesProvider>, root
);
