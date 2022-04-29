import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { GalleryPage } from './gallery-page';
import { LoginPage } from './login-page';
import { Navbar } from './navbar';
import { SignUpPage } from './sign-up-page';
import { UploadImagePage } from './upload-image-page';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<GalleryPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/upload' element={<UploadImagePage />} />
      </Routes>
    </Router>
  );
}

export default App;
