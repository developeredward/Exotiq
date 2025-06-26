const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  priceDaily: { type: Number, required: true },
  priceMonthly: { type: Number, required: true },
  category: { type: String, required: true },
  transmission: { type: String, required: true },
  fuel: { type: String, required: true },
  horsePower: { type: String, required: true },
  engine: { type: String, required: true },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
