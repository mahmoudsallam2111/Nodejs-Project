const mongoose = require("mongoose");
const { ObjectID } = require("Bson");

const teacherSchema = new mongoose.Schema({
  _id: { type: ObjectID, require: true, unique: true },
  fullname: { type: String, require: true },
  password: {
    type: String,
    require: true,
    validate: [/^[a-zA-Z0-9!@#$%^&*]{6,16}$/],
  },
  email: {
    type: String,
    require: false,
    validate: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    ],
  },
  image: { type: String, require: false },
});

//2 mapping model
mongoose.model("teachers", teacherSchema);
