import mongoose from "mongoose";
// import uniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema({
  email: { type: String, trim: true, required: true, unique: true },
  password: { type: String, trim: true, required: true },
});

// userSchema.plugin(uniqueValidator);

export const user = mongoose.model("User", userSchema);
