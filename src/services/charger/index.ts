import Charger from '../../db/charger';

const getAll = async () => {
  return await Charger.find();
};

const getById = async (id: number) => {
  return await Charger.findById(id);
};


export default { getAll,getById };
