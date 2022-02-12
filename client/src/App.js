import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Home from './pages'
import RegisterArtist from './components/RegisterArtist';
import RegisterUser from './components/RegisterUser';
import Publish from './components/Publish';
import Explore from './components/Explore';
import SongInfo from './components/SongInfo';


const App = () => {
  return (
    <div>
  
      <Routes>
      <Route path="/" element={<Home/>} exact />
        <Route path="/registerUser" element={<RegisterUser />} />
       
        <Route path="/registerArtist" element={<RegisterArtist />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/explore/:id" element={<SongInfo/>}/>
      </Routes>
    </div>
  )
}

export default App