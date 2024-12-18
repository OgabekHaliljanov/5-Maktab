import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AddUse from './components/addUser/AddUse';
import UsersTable from './components/readUser/ReadUsers';
import SinglePage from './components/singlePage/SinglePage';
import ProductsTable from './components/readProduct';

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/users' replace />} />
      <Route
        path='/*'
        element={token ? (
          <Routes>
            <Route path='/create' element={<AddUse />} />
            <Route path='/users' element={<UsersTable />} />
            <Route path='/products' element={<ProductsTable/>} />
            <Route path='/mypage/:id' element={<SinglePage />} />
            <Route path='/ ' element={<Navigate to='/users' />} />
          </Routes>
        ) : (
          <Navigate to='/users' replace />
        )}
      />
    </Routes>
  );
};

export default App;