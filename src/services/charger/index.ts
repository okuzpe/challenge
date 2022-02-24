import Joi from 'joi';
import Charger from '../../db/charger';
import { CHARGER_TYPE, POWER_TYPE } from '../../utils/dictionary';
import { INVALID_FORMAT } from '../../utils/error-codes';
import { ICharger, IFilterCharger } from '../../utils/interfaces/charger';

//VALIDATIONS COLD BE IN ANOTHER FOLDER
const chargerScheme = Joi.object().keys({
  code: Joi.string().required(),
  type: Joi.string()
    .valid(...CHARGER_TYPE)
    .required(),
  user: Joi.string(),
  voltage: {
    power: Joi.string()
      .valid(...POWER_TYPE)
      .required(),
    amount: Joi.number().min(0).max(100).required(),
  },
});

const chargerNotifyScheme = Joi.object().keys({
  id: Joi.boolean().required(),
  notify: Joi.boolean().required(),
});

const validateNotify = async (notify: string, id: string) => {
  const { error } = chargerNotifyScheme.validate({ notify, id });
  if (error) {
    throw new Error(INVALID_FORMAT);
  }
};

const validateBody = async (chargerBody: ICharger) => {
  const { error, value } = chargerScheme.validate(chargerBody);
  if (error) {
    throw new Error(INVALID_FORMAT);
  } else {
    return value;
  }
};

const create = async (charger: ICharger) => {
  const newCharger = new Charger(charger);
  return await newCharger.save();
};

const getAll = async () => {
  return await Charger.find().populate('user');
};

const getAllFiltered = async (filter: IFilterCharger) => {
  const users = await Charger.find<ICharger>(filter);
  return users;
};

const getById = async (id: string) => {
  return await Charger.findById(id).populate('user');
};

const update = async (charger: ICharger) => {
  const newCharger = await Charger.findOneAndUpdate(charger);
  return newCharger;
};

export default { create, getAll, getById, update, validateBody, validateNotify, getAllFiltered };
