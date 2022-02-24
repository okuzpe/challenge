import { Request, Response } from 'express';
import EmailService from '../../services/email';

const sendEmailTest = async (req: Request, res: Response) => {
  try {
    const data = await EmailService.sendUsersReports();
    return res.status(200).json({
      message: 'SUCCESS',
      data: data,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export { sendEmailTest };
