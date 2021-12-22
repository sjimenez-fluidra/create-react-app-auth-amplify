import React, { useState } from 'react';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Amplify, { API } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

const apiName = 'testApi';

const getUser = (userEmail) => {
  const path = '/user';
  const myInit = {
    headers: {},
    response: true,
    queryStringParameters: {
      userEmail
    },
  };
  return API.get(apiName, path, myInit).then(({ data }) => data);
}

const getUserSubscriptions = (identityId) => {
  const path = '/subscription';
  const myInit = {
    headers: {},
    response: true,
    queryStringParameters: {
      identityId
    },
  };
  return API.get(apiName, path, myInit).then(({ data }) => data);
}

const getUserPools = (identityId) => {
  const path = '/pools';
  const myInit = {
    headers: {},
    response: true,
    queryStringParameters: {
      identityId
    },
  };
  return API.get(apiName, path, myInit).then(({ data }) => data);
}

const App = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [subscriptions, setSubscriptions] = useState([]);
  const [pools, setPools] = useState([]);

  const getAll = async (email) => {
    const user = await getUser(email);
    setUser(user)
    const userSubscriptions = await getUserSubscriptions(user.identity_id);
    setSubscriptions(userSubscriptions)
    const userPools = await getUserPools(user.identity_id);
    setPools(userPools)
  }

  return (
    <div className="App">
      <AmplifySignOut />
      <div style={{ marginTop: '20px' }}>
        <label>User Email</label>
        <input onChange={(e) => { setEmail(e.target.value) }} value={email}></input>
        <button onClick={() => getAll(email)}>Search</button>
      </div>
      <div>
        <h3>User:</h3>
        <div className='result-container'><pre>{JSON.stringify(user, null, 4)}</pre></div>
        <h3>Subscriptions:</h3>
        <div className='result-container'><pre>{JSON.stringify(subscriptions, null, 4)}</pre></div>
        <h3>Pools:</h3>
        <div>{pools && `${pools.length} pools`}</div>
        <div className='result-container'>{
          pools.map(pool => {
            const baseLink = "https://test-aftersales.blueconnect.io";
            const poolLink = `${baseLink}/pools/${pool.swimming_pool_id}`;
            const blueLink = `${baseLink}/things/${pool.blue_device_serial}/data`;
            return (
              <div>
                <div><a href={poolLink} target="_blank">Pool Link</a></div>
                <div><a href={blueLink} target="_blank">Blue Link</a></div>
                <pre>{JSON.stringify(pool, null, 4)}</pre>
              </div>
            )
          })

        }</div>
      </div>
    </div>
  );

}

export default withAuthenticator(App);
