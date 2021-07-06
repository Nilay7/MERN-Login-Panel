import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Login from './components/Login/Login';
import useToken from './hooks/useToken';

function App() {
  const { token, setToken } = useToken();

  console.log('token',token)

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Landing Page</h1>
      <Router>
        <Switch>
          <Route path='/dashboard'>
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
