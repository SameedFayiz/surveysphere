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
  answers: {
    type: SchemaTypes.Array,
    required: true,
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
    category: { type: SchemaTypes.String, required: true },
    status: {
      type: SchemaTypes.String,
      enum: ["active", "inactive"],
      required: true,
    },
    questions: [questionSchema],
  },
  { timestamps: true }
);

export default models.Surveys || model("Surveys", surveySchema);
