import { Types } from 'mongoose';
import { IKeyAndTimestamp } from '../generic';

export interface ISession extends IKeyAndTimestamp {
  charger: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  initialBatery: number;
  finalBatery: number;
}

export interface ISesionFilters {
  charger?: Types.ObjectId;
  startDate?: Date;
  endDate?: Date;
  initialBatery?: number;
  finalBatery?: number;
}

export interface ISessionDoc extends ISession, Document {}
