

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';   
import App from './App';
// Vision UI Dashboard React Context Provider
import { VisionUIControllerProvider } from "context";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <VisionUIControllerProvider>
          <App />
        </VisionUIControllerProvider>
      </BrowserRouter>
      {/* <ToastContainer /> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);