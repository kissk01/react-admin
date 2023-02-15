import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav
      id='sidebarMenu'
      className='col-md-3 col-lg-2 d-md-block bg-light sidebar collapse'
    >
      <div className='position-sticky pt-3 sidebar-sticky'>
        <ul className='nav flex-column'>
          <li className='nav-item'>
            <NavLink to={'/'} className='nav-link'>
              Dashboard
            </NavLink>
          </li>
          <li className='nav-item'>
            <Link to={'/users'} className='nav-link'>
              Users
            </Link>
          </li>
          <li className='nav-item'>
            <Link to={'/roles'} className='nav-link'>
              Roles
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
