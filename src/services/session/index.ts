import Joi from 'joi';
import Session from '../../db/session';
import { ISesionFilters, ISession } from '../../utils/interfaces/session';
import { INVALID_FORMAT } from '../../utils/error-codes';
import { Types } from 'mongoose';

const sessionScheme = Joi.object().keys({
  charger: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  initialBatery: Joi.number().min(0).max(100).required(),
  finalBatery: Joi.number().min(0).max(100).required(),
});

const validateBody = async (userBody: ISession) => {
  const { error } = sessionScheme.validate(userBody);
  if (error) {
    throw new Error(INVALID_FORMAT);
  }
};

const create = async (session: ISession) => {
  const createdSession = new Session(session);
  await createdSession.save();

  return createdSession;
};

const getAll = async () => {
  const sessions = await Session.find();
  return sessions;
};

const getAllFiltered = async (filter: ISesionFilters) => {
  const sessions = await Session.find<ISession>(filter);
  return sessions;
};

const getById = async (id: string) => {
  const session = await Session.findById(id);
  return session;
};

const getByChargerIds = async (arrayId: Array<Types.ObjectId | undefined>) => {
  const sessions = await Session.find<ISession>().where('charger').in(arrayId).exec();
  return sessions;
};

const update = async (session: ISession) => {
  const updatedSession = await Session.findOneAndUpdate(session);
  return updatedSession;
};
export default { create, getAll, getById, update, validateBody, getAllFiltered, getByChargerIds };
