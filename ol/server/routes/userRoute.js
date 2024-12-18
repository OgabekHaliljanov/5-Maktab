const express = require('express');
const user = express.Router();
const { createUser,
    getUser,
    SignIn,
    UpdateUser,
    deleteUser,
    searchUsers,
    getUserParams,
    UserQuery,
} = require('../controller/userCtrl');

user.post('/signin/user', SignIn);
user.post('/create/user', createUser);
user.get('/get/user', getUser);
user.delete('/delete/:id', deleteUser);
user.put('/update/:id', UpdateUser);
user.get('/search', searchUsers);
// -----------------------------
// query
user.get('/get/user/:id', getUserParams);
// params
user.get('/user/query', UserQuery);



module.exports = user;
