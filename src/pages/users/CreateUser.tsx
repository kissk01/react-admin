import Wrapper from '../../components/Wrapper';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Role } from '../../models/role';
import { Navigate } from 'react-router-dom';

const CreateUser: React.FC = () => {
  const [first_name, setFirstName] = useState<string>('');
  const [last_name, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);
  const [roles, setRoles] = useState<Array<Role>>([]);
  const [role_id, setRoleId] = useState<string>('');

  useEffect(() => {
    const getRole = async () => {
      const { data } = await axios.get('roles');
      setRoles(data);
    };
    getRole();
  }, []);

  const submit = async (event: SyntheticEvent) => {
    event.preventDefault();

    await axios.post('/users', {
      first_name,
      last_name,
      email,
      role_id,
    });

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to='/users' />;
  }

  return (
    <Wrapper>
      <main className='form-signin w-100 m-auto'>
        <form onSubmit={submit}>
          <h1 className='h3 mb-3 fw-normal'>Please create user</h1>

          <label>First name</label>
          <div className='form-floating'>
            <input
              type='text'
              className='form-control'
              id='firstName'
              placeholder='name@example.com'
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
          </div>

          <label>Last name</label>
          <div className='form-floating'>
            <input
              type='text'
              className='form-control'
              id='lastName'
              placeholder='name@example.com'
              onChange={(event) => setLastName(event.target.value)}
              required
            />
          </div>
          <label>Email</label>
          <div className='form-floating'>
            <input
              type='email'
              className='form-control'
              id='floatingInput'
              placeholder='name@example.com'
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <label>Role</label>
          <div className='form-floating'>
            <select onChange={(event) => setRoleId(event.target.value)}>
              {roles.map((role: Role) => {
                return (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                );
              })}
            </select>
          </div>

          <button className='w-100 btn btn-lg btn-primary' type='submit'>
            Create user
          </button>
        </form>
      </main>
    </Wrapper>
  );
};

export default CreateUser;
