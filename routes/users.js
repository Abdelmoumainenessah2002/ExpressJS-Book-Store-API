const express = require('express');
const router = express.Router();
const { updateUser, getAllUsers, getUserById, deleteUser } = require('../controllers/userController');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/verifyToken');

router.route('/:id')
    .put(verifyTokenAndAuthorization, updateUser)
    .get(verifyTokenAndAuthorization, getUserById)
    .delete(verifyTokenAndAuthorization, deleteUser);

router.route('/')
    .get(verifyTokenAndAdmin, getAllUsers);

module.exports = router;
