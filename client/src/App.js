import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Home from './components/Home'
import RegisterArtist from './components/RegisterArtist';
import RegisterUser from './components/RegisterUser'

const App = () => {
  return (
    <div>
      <h1>App</h1>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/registerUser" element={<RegisterUser />} />
        <Route path="/registerArtist" element={<RegisterArtist />} />
       
      </Routes>
    </div>
  )
}

export default App