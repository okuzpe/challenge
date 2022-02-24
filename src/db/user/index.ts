import { Schema, model } from 'mongoose';
import { IUserDoc } from '../../utils/interfaces/user';

const userSchema = new Schema<IUserDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    notify: { type: Boolean, required: false, default: true },
    lang: { type: String, required: true },
  },
  { timestamps: true },
);

const User = model<IUserDoc>('User', userSchema);

export default User;
