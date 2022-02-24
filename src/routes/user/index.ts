import { Request, Response } from 'express';
import UserService from '../../services/user';
import { CONFLICT } from '../../utils/error-codes';

/* GET USER. */
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAll();
    return res.status(200).json({
      data: users,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

/* GET user by id. */
const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const users = await UserService.getById(id);
    return res.status(200).json({
      data: users,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

/* CREATE User. */
const createUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await UserService.validateBody(body);
    const existUser = await UserService.getByEmail(body.email);
    if (existUser.length) {
      return res.status(409).json({
        message: CONFLICT,
      });
    }
    const user = await UserService.create(body);
    return res.status(201).json({
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
/* UPDATE User. */
const updateUser = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    await UserService.validateBody(body);
    const user = await UserService.update(body);
    return res.status(200).json({
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

/* TURN ON/OF Notify. */
const updateUserNotify = async (req: Request, res: Response) => {
  const { notify } = req.body;
  const { id } = req.params;
  try {
    await UserService.validateNotify(notify, id);
    const user = await UserService.updateNotify(id, notify);
    return res.status(200).json({
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export { createUser, getUsers, getUserById, updateUser, updateUserNotify };
