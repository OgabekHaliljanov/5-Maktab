const { Router } = require('express');

const balans = Router();
const { getBalans,
    updateMoney
 } = require('../controller/Balans');

 balans.get('/get/balans', getBalans);
 balans.post('/update/money', updateMoney);
 module.exports = balans;
 





