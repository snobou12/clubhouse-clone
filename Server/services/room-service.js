const RoomModel = require('../models/room-model.js');
const ApiError = require('../exceptions/api-errors');
class RoomService {
  async createRoom(title, description, userCreator) {
    const candidateRoom = await RoomModel.findOne({ title });
    if (candidateRoom) {
      throw ApiError.BadRequest('This room name already exists');
    }
    const room = await RoomModel.create({
      title,
      description,
      connectedPeople: [],
      connectedCount: 0,
      createdData: new Date(), // поменять дату
      userCreator,
    });
  }

  async getRoomById(id) {
    const room = await RoomModel.findById(id);
    if (!room) {
      throw ApiError.BadRequest('Room not found');
    }
    return room;
  }

  async getAllRooms() {
    const rooms = await RoomModel.find();
    // dto room может ,хз
    return rooms;
  }

  async updateRoom(connectedCount, connectedPeople, roomId) {
    const room = await RoomModel.findById(roomId);
    if (!room) {
      throw ApiError.BadRequest('Room not found for changes');
    }
    room.connectedCount = connectedCount;
    room.connectedPeople = connectedPeople;
    room.save();
  }
}

module.exports = new RoomService();
