import { Schema, SchemaTypes, model, models } from "mongoose";

const userSchema = new Schema(
  {
    userName: { type: SchemaTypes.String, required: true },
    email: { type: SchemaTypes.String, required: true, unique: true },
    password: { type: SchemaTypes.String, required: true },
  },
  { timestamps: true }
);

export default models.Users || model("Users", userSchema);

export const testUser = "66057985d4a8052d2b7daf62";
