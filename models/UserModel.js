import { genSalt, hash } from "bcrypt";
import mongoose from "mongoose";

// define the type of data
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  color: {
    type: Number,
    required: false,
  },
  profileSetup: {
    type: Boolean,
    required: false,
  },
});

// encrypt the password
// use function because you will need access to "this."
userSchema.pre("save", async function (next) {
  // generate salt
  const salt = await genSalt();
  this.password = await hash(this.password, salt);
  // next tells the server this is completed and it can move on
  // otherwise the server will stop here
  next();
});

const User = mongoose.model("Users", userSchema);

export default User;
