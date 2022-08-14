import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Movements from './components/Movements';
import PrivateRoute from './components/PrivateRoute';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

import { AuthProvider } from './hooks/useAuth';

function App() {
  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route
              path='/movements'
              element={
                <PrivateRoute>
                  <Movements />
                </PrivateRoute>
              }
            />
            <Route path='*' element={<h2>404</h2>} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
