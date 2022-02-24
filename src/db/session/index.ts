import { Schema, model } from 'mongoose';
import { ISessionDoc } from '../../utils/interfaces/session';

const sessionSchema = new Schema<ISessionDoc>(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    initialBatery: { type: Number, required: true },
    finalBatery: { type: Number, required: true },
    charger: {
      type: Schema.Types.ObjectId,
      ref: 'Charger',
      required: true,
    },
  },
  { timestamps: true },
);

const Session = model<ISessionDoc>('Session', sessionSchema);

export default Session;
