import { Schema, SchemaTypes, model, models } from "mongoose";

const questionSchema = new Schema({
  question: {
    type: SchemaTypes.String,
    required: true,
  },
  qNo: { type: SchemaTypes.Number },
  type: {
    type: SchemaTypes.String,
    enum: ["text", "radio", "scale"],
    required: true,
  },
  options: {
    type: SchemaTypes.Map,
    required: function () {
      return this.type === "radio";
    },
  },
  range: {
    type: SchemaTypes.Array,
    required: function () {
      return this.type === "scale";
    },
  },
});

const surveySchema = new Schema(
  {
    user: { type: SchemaTypes.ObjectId, required: true, ref: "Users" },
    surveyTitle: {
      type: SchemaTypes.String,
      required: true,
    },
    description: { type: SchemaTypes.String, required: true },
    accessList: { type: SchemaTypes.Array, required: true },
    questions: [questionSchema],
  },
  { timestamps: true }
);

// const question = model("Questions", questionSchema);

export default models.Surveys || model("Surveys", surveySchema);