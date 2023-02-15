import axios from 'axios';
import { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPass] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);

  const submit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const { data } = await axios.post('login', {
      email,
      password,
    });

    console.log(data, ' data ');
    setRedirect(true);
  };
  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <main className='form-signin w-100 m-auto'>
      <form onSubmit={submit}>
        <h1 className='h3 mb-3 fw-normal'>Please sign in</h1>

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
        <div className='form-floating'>
          <input
            type='password'
            className='form-control'
            id='floatingPassword'
            placeholder='Password'
            onChange={(event) => setPass(event.target.value)}
            required
          />
        </div>

        <button className='w-100 btn btn-lg btn-primary' type='submit'>
          Submit
        </button>
      </form>
    </main>
  );
};

export default Login;
