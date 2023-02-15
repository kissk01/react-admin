import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { User } from '../../models/user';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  useEffect(() => {
    const getUser = async () => {
      const { data: rootData } = await axios.get(`users?page=${page}`);
      const { data }: { data: [User] } = rootData;
      setUsers(data);
      console.log(rootData.meta.last_page, ' rootData.meta.last_page ');
      setLastPage(rootData.meta.last_page);
    };
    getUser();
  }, [page]);

  const next = () => {
    if (page < lastPage) {
      setPage(page + 1);
    }
  };

  const previous = () => {
    if (page >= 1) {
      setPage(page - 1);
    }
  };

  const deleteUser = async (id: number | undefined) => {
    if (id && window.confirm('Are you sure want to delete this record?')) {
      await axios.delete(`users/{id}`);
      setUsers(users.filter((userItem: User) => userItem.id !== id));
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
              <th scope='col'>Email</th>
              <th scope='col'>Role</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => {
              return (
                <tr key={user.id}>
                  <th scope='col'>{user.id}</th>
                  <th scope='col'>
                    {user.first_name} {user.last_name}
                  </th>
                  <th scope='col'>{user.email}</th>
                  <th scope='col'>{user.role?.name}</th>
                  <th scope='col'>
                    <Link to={`/users/${user.id}/edit`}>Edit</Link>
                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <nav>
        <ul className='pagination'>
          <li className='page-item'>
            <a href='#' className='page-link' onClick={previous}>
              Previous
            </a>
          </li>
          <li className='page-item'>
            <a href='#' className='page-link' onClick={next}>
              Next
            </a>
          </li>
        </ul>
        <Link to='/users/create' className='p-2 text-decoration-none'>
          Create user
        </Link>
      </nav>
    </Wrapper>
  );
};

export default Users;
