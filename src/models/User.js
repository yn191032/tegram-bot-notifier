const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  chatId: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  price: {
    min: { type: Number, min: 50, max: 1000, default: 50 },
    max: { type: Number, min: 50, max: 1000, default: 500 },
  },
  rooms: {
    min: { type: Number, min: 1, max: 5, default: 1 },
    max: { type: Number, min: 1, max: 5, default: 2 },
  },
});

UserSchema.methods.filterApartments = function(apartments) {
  return apartments.filter(a => {
    const rooms = parseInt(a.rentType);
    const price = parseInt(a.price);

    if (!(price >= this.price.min && price <= this.price.max)) {
      return false;
    }

    if (!(rooms >= this.rooms.min && rooms <= this.rooms.max)) {
      return false;
    }

    return true;
  });
};

UserSchema.statics.setPrice = async function(chatId, min, max) {
  const user = await this.findOneAndUpdate(
    { chatId }, 
    { price: { min, max } }
  );
  return user;
}; 

UserSchema.statics.setRooms = async function(chatId, min, max) {
  const user = await this.findOneAndUpdate(
    { chatId }, 
    { rooms: { min, max } }
  );
  return user;
}; 

module.exports = model('User', UserSchema);