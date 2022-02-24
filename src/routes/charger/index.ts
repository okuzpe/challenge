import { Request, Response } from 'express';
import ChargerService from '../../services/charger';

/* CREATE Charger. */
const createCharger = async (req: Request, res: Response) => {
  try {
    const chargerBody = await ChargerService.validateBody(req.body);
    const chargers = await ChargerService.create(chargerBody);
    return res.status(201).json({
      data: chargers,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

/* GET Charger. */
const getChargers = async (req: Request, res: Response) => {
  try {
    const chargers = await ChargerService.getAll();
    return res.status(200).json({
      data: chargers,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getChargerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const chargers = await ChargerService.getById(id);
    return res.status(200).json({
      data: chargers,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

/* UPDATE Charger. */
const updateCharger = async (req: Request, res: Response) => {
  try {
    const chargerBody = await ChargerService.validateBody(req.body);
    const chargers = await ChargerService.update(chargerBody);
    return res.status(200).json({
      data: chargers,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

/* TURN ON/OFF Charger notify. */
const updateChargerNotify = async (req: Request, res: Response) => {
  try {
    const chargerBody = await ChargerService.validateBody(req.body);
    const chargers = await ChargerService.update(chargerBody);
    return res.status(200).json({
      data: chargers,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export { createCharger, getChargers, getChargerById, updateCharger, updateChargerNotify };
