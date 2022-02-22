import { Request, Response } from 'express';
import chargerService from '../../services/charger';
import { INTERNAL_SERVER_ERROR } from '../../utils/error-codes';

/* GET Charger. */
const getChargers = async (req: Request, res: Response) => {
  try {
    const chargers = await chargerService.getAll();
    console.log(chargers);
    // chargers.map(charger=>{
    //   charger.batery
    // });
    return res.status(200).json({
      data: chargers,
    });
  } catch (error) {
    return res.status(500).json({
      message: INTERNAL_SERVER_ERROR,
      error: error,
    });
  }
};

export { getChargers };
