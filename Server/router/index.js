const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const roomController = require('../controllers/room-controller');

const authMiddleware = require('../middlewares/auth-middleware');

const uploader = require('../services/uploader-service');

const router = Router();

router.post('/postActivationCode', userController.postActivationCode);

router.post('/registration', userController.registration);

router.post('/login', userController.login);

router.post('/logout', authMiddleware, userController.logout);

router.get('/refresh', userController.refresh);

router.post('/upload', uploader.single('photo'), (req, res) => {
  res.json({
    url: `/avatars/${req.file.filename.replace('.png', '.jpeg')}`,
  });
});

router.post('/createRoom', authMiddleware, roomController.createRoom);

router.get('/getRoomById/:id', authMiddleware, roomController.getRoomById);

router.get('/getAllRooms', authMiddleware, roomController.getAllRooms);

module.exports = router;
