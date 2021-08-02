module.exports = class UserDto {
  phone;
  id;
  isActivated;
  username;
  userImagePath;
  constructor(model) {
    this.phone = model.phone;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.username = model.username;
    this.userImagePath = model.userImagePath;
  }
};
