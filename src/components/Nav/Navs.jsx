import './Navs.css';
import { Nav  } from 'rsuite';
import AdminIcon from '@rsuite/icons/Admin';

const Navs = () => {
  const user = localStorage.getItem('user');

    return (
        <div className='sidebar'>
          <div className="user-info">
            <div className="avatar"><AdminIcon/></div>
            <div className="user-name">{user}</div>
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