const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const classSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    name: { type: String, require: true },
    supervisor: { type: Object, require: false, ref: "teachers" }, ///ref : collection name
    children: { type: Array, require: false },
  },
  { _id: false }
);

classSchema.plugin(AutoIncrement);
//2 mapping model
mongoose.model("class", classSchema);
