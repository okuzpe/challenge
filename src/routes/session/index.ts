import { Request, Response } from 'express';
import SessionService from '../../services/session';

/* CREATE Session. */
const createSession = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    await SessionService.validateBody(body);
    const sessions = await SessionService.create(body);
    return res.status(201).json({
      data: sessions,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

/* GET Session. */
const getSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await SessionService.getAll();
    return res.status(200).json({
      data: sessions,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getSessionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const sessions = await SessionService.getById(id);
    return res.status(200).json({
      data: sessions,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

/* UPDATE Session. */
const updateSession = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    await SessionService.validateBody(body);
    const sessions = await SessionService.update(body);
    return res.status(200).json({
      data: sessions,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export { createSession, getSessions, getSessionById, updateSession };
