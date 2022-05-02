import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { GalleryPage } from './gallery-page';
import { LoginPage } from './login-page';
import { Logout } from './logout';
import { Navbar } from './navbar';
import { SignUpPage } from './sign-up-page';
import { UploadImagePage } from './upload-image-page';
import { useToken } from './auth';

function App() {
  const { token } = useToken();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={token == null || token == undefined ? <LoginPage /> : <GalleryPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/upload' element={token == null || token == undefined ? <LoginPage /> : <UploadImagePage />} />
      </Routes>
    </Router>
  );
}

export default App;
