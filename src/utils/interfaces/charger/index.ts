import { Types } from 'mongoose';
import { CHARGER_TYPE, POWER_TYPE } from '../../dictionary';
import { IKeyAndTimestamp } from '../generic';

export interface ICharger extends IKeyAndTimestamp {
  code: string;
  type: ChargerType;
  enableReport: boolean;
  user?: Types.ObjectId;
  voltage: IChargerVoltage;
}

export interface IFilterCharger {
  code?: string;
  type?: ChargerType;
  enableReport?: boolean;
  user?: Types.ObjectId;
  voltage?: {
    power?: PowerType;
    amount?: number;
  };
}

export interface IChargerVoltage {
  power: PowerType;
  amount: number;
}

export interface IChargerDoc extends ICharger, Document {}

export type ChargerType = keyof typeof CHARGER_TYPE;
export type PowerType = keyof typeof POWER_TYPE; //testin with out number
