import './Home.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navs from '../Nav/Navs.jsx';
import Info from '../Info/Info.jsx';
import Lotes from '../Pages/Lotes.jsx';
import Productos from '../Pages/Productos.jsx';
import Proveedores from '../Pages/Proveedores.jsx';


const Home = () => {


    return (

      <Router>
            <div className="home-container">
                <Navs />
                <div className="content-container">
                  <Routes>
                        <Route path="/info" element={<Info />} />
                        <Route path="/lotes" element={<Lotes />} />
                        <Route path="/productos" element={<Productos />} />
                        <Route path="/proveedores" element={<Proveedores />} />
                        <Route path="/" element={<Info />} />
                  </Routes>
                </div>
            </div>
        </Router>
      
    );
}

export default Home;
