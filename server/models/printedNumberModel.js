const mongoose = require("mongoose");
const formSchema = mongoose.Schema(
  {
    number: { type: Number, default: null }
  },
  { timestamps: true }
);

const Print = mongoose.model("Print", formSchema);
module.exports = Print;
