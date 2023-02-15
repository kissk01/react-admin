import axios from 'axios';
import React, { FunctionComponent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Menu from './Menu';
import Nav from './Nav';

type WrapperProps = { children: React.ReactNode };

const Wrapper: FunctionComponent<WrapperProps> = (props) => {
  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get('user');
        console.log(' nav user: ', data);
      } catch (error) {
        setRedirect(true);
      }
    };
    getUser();
  }, []);

  if (redirect) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      <Nav />
      <div className='container-fluid'>
        <div className='row'>
          <Menu />
          <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
            {props.children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Wrapper;
