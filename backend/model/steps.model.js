const { Schema, model } = require("mongoose");

const StepSchema = new Schema({
  num1: { type: Number, required: true },
  num2: { type: Number, required: true },
});

const StepModel = model("step", StepSchema);

module.exports = StepModel;