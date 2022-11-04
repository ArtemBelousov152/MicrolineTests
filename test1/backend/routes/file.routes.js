const Router = require('express');
const router = new Router();
const fileController = require('../controller/file.controller')

router.get('/getdata', fileController.getFile);

module.exports = router;