import React from 'react';
import ReactDOM from 'react-dom';
import Core from './components/Core';
import * as serviceWorker from './serviceWorker';

import { ToastContainer } from 'react-toastify';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <>
    <Core />
    <ToastContainer autoClose={4000} />
  </>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
