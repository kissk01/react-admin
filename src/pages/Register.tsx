import React from 'react';
import axios from 'axios';
import { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';

import '../Login.css';

const Register = () => {
  const [register, setRegister] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);

  const submit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const { data } = await axios.post('register', {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      password_confirm: passwordConfirm,
    });
    console.log('register: ', data);
    setRedirect(true);
  };
  if (redirect) {
    return <Navigate to={'/login'} />;
  }

  return (
    <main className='form-signin w-100 m-auto'>
      <form onSubmit={submit}>
        <h1 className='h3 mb-3 fw-normal'>Please reg</h1>

        <div className='form-floating'>
          <input
            className='form-control'
            id='floatingInput'
            placeholder='First name'
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
          <input
            className='form-control'
            id='floatingInput'
            placeholder='Last name'
            required
            onChange={(event) => setLastName(event.target.value)}
          />
          <input
            type='email'
            className='form-control'
            id='floatingInput'
            placeholder='name@example.com'
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className='form-floating'>
          <input
            type='password'
            className='form-control'
            id='floatingPassword'
            placeholder='Password'
            required
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            type='password'
            className='form-control'
            id='floatingPassword'
            placeholder='Password confirm'
            required
            onChange={(event) => setPasswordConfirm(event.target.value)}
          />
        </div>

        <button className='w-100 btn btn-lg btn-primary' type='submit'>
          Submit
        </button>
      </form>
    </main>
  );
};

export default Register;
