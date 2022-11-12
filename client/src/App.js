import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Auth/Register';
import Landing from './components/Auth/Landing';
import Login from './components/Auth/Login';
import Navbar from './components/Auth/Navbar';
import Sidebar from './components/SideBar/Sidebar';
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RightSide/RightSide';
import LoggingPlayer from './components/player/App';
import PdfPage from './components/PDF/pdfPage';
import styles from './App_Dash.css';
import VideoBot from './components/videobot/Videobot';
import PlayerBot from './components/player/Bot/PlayerBot';
import Camera from './components/camera';

export default function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={
        <div className="App" style={styles.App}>
        <div className="AppGlass" style={styles.AppGlass}>
          <Sidebar/>
          <MainDash/>
          <RightSide/>
        </div>
        </div>} />
    <Route exact path="/player" element={
    <>
    <div className="AppGlassPlayer" style={styles.AppGlassPlayer}>

      <LoggingPlayer/>
      <PlayerBot />
      </div>
    </>} />
    
    <Route exact path="/pdf" element={<PdfPage />} />
    <Route exact path="/videobot" element={<VideoBot />} />
    <Route exact path="/camera" element={<Camera />} />
      </Routes>
    </BrowserRouter>
  )
}