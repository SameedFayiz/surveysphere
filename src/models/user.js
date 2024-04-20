import { Schema, SchemaTypes, model, models } from "mongoose";

const userSchema = new Schema(
  {
    firstName: { type: SchemaTypes.String, required: true },
    lastName: { type: SchemaTypes.String, required: true },
    email: { type: SchemaTypes.String, required: true, unique: true },
    password: { type: SchemaTypes.String, required: true },
  },
  { timestamps: true }
);

export default models.Users || model("Users", userSchema);
