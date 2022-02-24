import { Types } from 'mongoose';

type ID = Types.ObjectId;

export interface IKeyAndTimestamp {
  _id?: ID;
  createdAt?: Date;
  updatedAt?: Date;
}
