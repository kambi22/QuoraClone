import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux';
import { persistor, store } from './quora/Services/Reducer/store';
import { PersistGate } from 'redux-persist/integration/react';
import swDev from './swDev';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
      <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
swDev();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
