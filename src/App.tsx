import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateUser from './pages/users/CreateUser';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Users from './pages/users/Users';
import EditUser from './pages/users/EditUser';
import Roles from './pages/roles/Roles';
import CreateRole from './pages/roles/CreateRole';
import EditRole from './pages/roles/EditRole';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/users' element={<Users />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/users/create' element={<CreateUser />} />
          <Route path='/users/:id/edit' element={<EditUser />} />
          <Route path='/roles' element={<Roles />} />
          <Route path='/roles/create' element={<CreateRole />} />
          <Route path='/roles/:id/edit' element={<EditRole />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
