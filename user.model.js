import mongoose, { Schema } from 'mongoose';
import jwt from 'json-web-token';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      lowercase: true,
      index: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      require: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      require: true,
      trim: true,
      index: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Video',
      },
    ],
    password: {
      type: String,
      require: [true, 'password required'],
      trim: true,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// here we have use the pre hooks that use to help that we can chnage just before the date got save into the database..
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});

// also we can maka the methods in mongos like save, findone and alll here it is
userSchema.methods.isPasswordCurrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.genrateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      fullname: this.fullname,
    },
    'thisisSecrate',
    { expiresIn: '2d' }
  );
};

userSchema.methods.genrateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    'thisisRefrasghSecrate',
    { expiresIn: '20d' }
  );
};
export const User = mongoose.model('User', userSchema);
