import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { User } from '../models/user';

type user = {
  first_name?: string | undefined;
  last_name?: string | undefined;
  id?: number | undefined;
  email?: string | undefined;
  name?: string;
  role?: {
    name: string;
    id: number;
  };
};

const Nav = () => {
  const [user, setUser] = useState<user>(new User());

  useEffect(() => {
    const getUser = async () => {
      const { data }: { data: user } = await axios.get('user');
      console.log(' nav user: ', data);
      setUser(
        new User(
          data.first_name,
          data.last_name,
          data.id,
          data.email,
          data.role
        )
      );
    };
    getUser();
  }, []);

  const logout = async () => {
    await axios.post('logout', {});
  };

  return (
    <nav className='navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow'>
      <a className='navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6'>
        Company name
      </a>
      <ul className='my-2 my-md-0 mr-md-3'>
        <Link to='/profile' className='p-2 text-white text-decoration-none'>
          {user.name}
        </Link>
        <Link
          to='/login'
          className='p-2 text-white text-decoration-none'
          onClick={logout}
        >
          Sign out
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
