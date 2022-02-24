import { Schema, model } from 'mongoose';
import { CHARGER_TYPE, POWER_TYPE } from '../../utils/dictionary';
import { IChargerDoc } from '../../utils/interfaces/charger';

const chargerSchema = new Schema<IChargerDoc>(
  {
    code: { type: String, required: true },
    type: { type: String, enum: CHARGER_TYPE, required: true },
    enableReport: { type: Boolean, required: true, default: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    voltage: {
      power: { type: String, enum: POWER_TYPE, required: true },
      amount: { type: Number, required: true },
    },
  },
  { timestamps: true },
);

const Charger = model<IChargerDoc>('Charger', chargerSchema);

export default Charger;
