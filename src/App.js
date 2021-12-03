import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Amplify, { API } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

const App = () => {
  useEffect(() => {
    const apiName = 'testApi';
    const path = '/users'; 
    const myInit = {
        headers: {},
        response: true,
        queryStringParameters: { 
        },
    };
    API.get(apiName, path, myInit).then(response => {console.log(response)});
  }, []);

  return (
    <div className="App">
      <AmplifySignOut />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  
}

export default withAuthenticator(App);
