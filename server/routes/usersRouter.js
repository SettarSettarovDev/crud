const Router = require('express');
const router = new Router();
const {
  registration,
  login,
  check,
  getAllUsers,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/registration', registration);
router.post('/login', login);
router.get('/auth', authMiddleware, check);
router.get('/', checkRole('ADMIN'), getAllUsers);
router.put('/:userId', checkRole('ADMIN'), updateUser);
router.delete('/:userId', checkRole('ADMIN'), deleteUser);

module.exports = router;
