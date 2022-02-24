import Joi from 'joi';
import User from '../../db/user';
import { IFilterUser, IUser } from '../../utils/interfaces/user';
import { INVALID_FORMAT } from '../../utils/error-codes';

//THIS VALIDATIONS COLD BE IN ANOTHER FOLDERS
const userScheme = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  country: Joi.string().required(),
  notify: Joi.boolean(),
  lang: Joi.string().required(),
});

const userNotifyScheme = Joi.object().keys({
  id: Joi.string().required(),
  notify: Joi.boolean().required(),
});

const validateBody = async (userBody: IUser) => {
  const { error } = userScheme.validate(userBody);
  if (error) {
    throw new Error(INVALID_FORMAT);
  }
};

const validateNotify = async (notify: string, id: string) => {
  const { error } = userNotifyScheme.validate({ notify, id });
  if (error) {
    throw new Error(INVALID_FORMAT);
  }
};
const create = async (user: IUser) => {
  const createdUser = new User(user);
  await createdUser.save();

  return createdUser;
};

const getAll = async () => {
  const users = await User.find();
  return users;
};

const getAllFiltered = async (filter: IFilterUser) => {
  const users = await User.find(filter);
  return users;
};

const getById = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

const getByEmail = async (email: string) => {
  const user = await User.find<IUser>({ email: email });
  return user;
};

const update = async (user: IUser) => {
  const updatedUser = await User.findOneAndUpdate({ _id: user._id }, user, {
    new: true,
  });
  return updatedUser;
};

const updateNotify = async (userId: string, notify: boolean) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { notify: notify },
    {
      new: true,
    },
  );
  return updatedUser;
};

export default {
  create,
  getAll,
  getById,
  update,
  updateNotify,
  getByEmail,
  validateBody,
  validateNotify,
  getAllFiltered,
};
