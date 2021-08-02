const roomService = require('../services/room-service');
class RoomController {
  async createRoom(req, res, next) {
    try {
      const { title, description, userCreator } = req.body;
      const room = await roomService.createRoom(title, description, userCreator);
      return res.json('Room was created successfully');
    } catch (e) {
      next(e);
    }
  }

  async getRoomById(req, res, next) {
    try {
      const id = req.params.id;
      const room = await roomService.getRoomById(id);
      return res.json(room);
    } catch (e) {
      next(e);
    }
  }

  async getAllRooms(req, res, next) {
    try {
      const rooms = await roomService.getAllRooms();
      return res.json(rooms);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new RoomController();
