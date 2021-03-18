import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider 
      domain='dev-mmp5dfj4.us.auth0.com'
      clientId='yBNoHEbyRn83wqFgJn131iNpzV4Eckaa'
      redirectUri={window.location.origin}
      cacheLocation='localstorage'
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode> 
  , document.getElementById('root')
);


serviceWorker.unregister();
