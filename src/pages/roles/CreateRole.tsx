import axios from 'axios';
import { useState, useEffect, SyntheticEvent } from 'react';
import { Navigate } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { Permission } from '../../models/permission';

const CreateRole = () => {
  const [permissions, setPermissions] = useState([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [name, setName] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    const getPermissions = async () => {
      const { data } = await axios.get('permissions');
      setPermissions(data);
    };
    getPermissions();
  }, []);

  const submit = async (event: SyntheticEvent) => {
    event.preventDefault();
    await axios.post('roles', {
      name,
      permissions: selected,
    });
    setRedirect(true);
  };

  const checkPermission = (id: number) => {
    if (selected.some((s) => s === id)) {
      setSelected(selected.filter((s) => s !== id));
      return;
    }

    setSelected([...selected, id]);
  };

  if (redirect) {
    return <Navigate to={'/roles'} />;
  }

  return (
    <Wrapper>
      <main className='form-signin w-100 m-auto'>
        <form onSubmit={submit}>
          <h1 className='h3 mb-3 fw-normal'>Create Role</h1>

          <div className='form-floating'>
            <input
              className='form-control'
              onChange={(event) => setName(event.target.value)}
            ></input>
          </div>
          <div className='form-floating'>
            {permissions.map((permission: Permission) => {
              return (
                <div
                  className='form-check form-check-inline col-3'
                  key={permission.id}
                >
                  <input
                    className='form-check-input'
                    type={'checkbox'}
                    value={permission.id}
                    onChange={() => checkPermission(permission.id)}
                  ></input>
                  <label className='form-check-label'>{permission.name}</label>
                </div>
              );
            })}
          </div>

          <button className='w-100 btn btn-lg btn-primary' type='submit'>
            Submit
          </button>
        </form>
      </main>
    </Wrapper>
  );
};

export default CreateRole;
