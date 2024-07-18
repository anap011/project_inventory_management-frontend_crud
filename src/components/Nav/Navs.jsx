import './Navs.css';
//import React, { useState, useEffect } from 'react';
import { Nav } from 'rsuite';
import { Link } from 'react-router-dom';

const Navs = () => {

    return (
        <div className='sidebar'>
          <div className="user-info">
            <div className="avatar"></div>
            <div className="user-name">User 1</div>
          </div>
          <div className='nav-tabs'>
            <Nav vertical appearance='default'>
              <Nav.Item eventKey="productos" className="nav-item" href='/productos'>Productos</Nav.Item>
              <Nav.Item eventKey="proveedores" className="nav-item" href='/proveedores'>Proveedores</Nav.Item>
              <Nav.Item eventKey="lotes" className="nav-item" href='/lotes'>Lotes</Nav.Item>
              
              <Nav.Item eventKey="manual" className="nav-item nav-item-manual" href='/info'>Información</Nav.Item>
            </Nav>
          </div>
          
        </div>
    );
}
  
export default Navs;