const mongoose = require("mongoose");

const formSchema = mongoose.Schema(
  {
    assignDate: { type: String, default: null },
    area: { type: String, default: null, trim: true },
    pieceNumber: { type: String, default: null },
    paperNumber: { type: String, default: null, trim: true },
    department: { type: String, default: null, trim: true },
    addressNubmer: { type: String, default: null },
    recordNumber: { type: String, default: null },
    husbandName: { type: String, default: null, trim: true },
    husbandName2: { type: String, default: null, trim: true },
    motherName: { type: String, default: null, trim: true },
    classType: { type: String, default: null, trim: true },
    birthDate: { type: String, default: null },
    birthPlace: { type: String, default: null, trim: true },
    fullName: { type: String, default: null, trim: true },
    formNumber: { type: String, default: null },
    file: { type: String, default: null },
    beneficiary: { type: Boolean, default: false, trim: true },
    createdBy: { type: String, default: null },
    note: { type: String, default: "", trim: true },
    number: { type: Number, default: null },
    is_pending: { type: Boolean, default: true },
  },
  { timestamps: true }
);

formSchema.pre('save', async function (next) {
  // the number is equall any form.number value
  // if there a form in db store the number

  // find any form in this Form instade of this
  const form = await Form.findOne({}).sort({ createdAt: -1 });

  console.log(".......", form);

  if (!form) {
    this.number = 1;
  } else {
    this.number = form.number;
  }

  next();
})

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
