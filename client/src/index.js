import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './Redux/Store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import 'antd/dist/antd.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import 'react-color-palette/lib/css/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const darkTheme = createTheme({
   palette: {
      mode: 'dark',
   },
});

root.render(
   <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
         <CookiesProvider>
            <BrowserRouter>
               {/* <React.StrictMode> */}
               <App />
               {/* </React.StrictMode> */}
            </BrowserRouter>
         </CookiesProvider>
      </Provider>
   </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
