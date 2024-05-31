import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';


const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique:true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//password hashing 
//pre save middleware/ hook
userSchema.pre('save', async function (next) {
  //hash pass and save into db
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

//post and save middleware(set ' ' after saving password)
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next()
});

export const UserModel = model<TUser>('User', userSchema);
