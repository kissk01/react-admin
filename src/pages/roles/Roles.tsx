import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { Role } from '../../models/role';

const Roles = () => {
  const [roles, setRoles] = useState<Array<Role>>([]);

  useEffect(() => {
    const getRole = async () => {
      const rolesResponse = await axios.get('roles');
      setRoles(rolesResponse.data);
    };
    getRole();
  }, []);

  const deleteRole = async (id: number) => {
    if (window.confirm('Sure?')) {
      await axios.delete(`roles/${id}`);

      setRoles(roles.filter((role: Role) => role.id !== id));
    }
  };

  return (
    <Wrapper>
      <div className='table-responsive'>
        <table className='table table-striped table-sm'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role: Role) => {
              return (
                <tr key={role.id}>
                  <td>{role.id}</td>
                  <td>{role.name}</td>
                  <td>
                    <Link to={`/roles/${role.id}/edit`}>Edit</Link>
                    <button onClick={() => deleteRole(role.id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Roles;
