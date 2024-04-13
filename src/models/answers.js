import { Schema, SchemaTypes, model, models } from "mongoose";

const answerSchema = new Schema({
  user: { type: SchemaTypes.ObjectId, required: true, ref: "Users" },
  survey: {
    type: SchemaTypes.ObjectId,
    required: true,
    ref: "Surveys",
  },
  question: {
    type: SchemaTypes.ObjectId,
    required: true,
    ref: "Questions",
  },
  answers: { type: SchemaTypes.Array, required: true },
});

export default models.Answers || model("Answers", answerSchema);
