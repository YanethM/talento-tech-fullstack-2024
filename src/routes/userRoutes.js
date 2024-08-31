const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* Definición de rutas del proyecto: http://localhost:3005 */
router.post('/new-user', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.get('/gmail/list', userController.getUsersByGmail);
router.patch('/:id', userController.editUser);
router.patch('/list/inactive-user', userController.inactivateNonAdminUsers);
router.delete('/:id', userController.deleteUser);
router.patch('/inactive-user/:id', userController.inactivateUser);

module.exports = router;