import mongoose, { Schema, Document, model } from 'mongoose';
import { IChargerDoc } from '../../utils/types/charger';

const chargerSchema = new Schema<IChargerDoc>({}, { timestamps: true });

const Charger = model<IChargerDoc>('Charger', chargerSchema);

export default Charger;
