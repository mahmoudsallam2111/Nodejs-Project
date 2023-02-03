const mongoose = require("mongoose");
const { ObjectID } = require("Bson");

const addressSchema = new mongoose.Schema(
  {
    city: { type: String },
    street: { type: Number },
    building: { type: Number },
  },
  { _id: false }
);

const childSchema = new mongoose.Schema({
  _id: { type: ObjectID, require: true, unique: true },
  fullame: { type: String, require: true },
  age: { type: Number, require: true },
  level: { type: String, Enumerator: ["prekg , kg1 , kg2"] },
  address: addressSchema,
});

//2 mapping model
mongoose.model("childs", childSchema);
