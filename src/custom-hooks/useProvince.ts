import { IFetchProvince, IProvince } from "../interfaces";
import ProvinceService from "../services/province.service";

export const useProvince = () => {
  const provinceSV = new ProvinceService();

  const getAllProvinces = async (
    query?: string,
    options = {}
  ): Promise<IFetchProvince> => {
    const { data }: any = await provinceSV.getAllProvinces(query, options);
    return data;
  };

  const createProvince = async (data: IProvince) => {
    const { status }: any = await provinceSV.create(data);
    if (status == 201) {
      return true;
    }
    return false;
  };

  const updateProvince = async (data: IProvince) => {
    const { status }: any = await provinceSV.update(data);
    if (status == 200) {
      return true;
    }
    return false;
  };

  const deleteProvince = async (id) => {
    await provinceSV.remove(id);
  };

  const getAllImages = async (ownerId, options = {}) => {
    const { data }: any = await provinceSV.getProvinceImages(ownerId, options);
    return data;
  };

  return {
    getAllProvinces,
    createProvince,
    updateProvince,
    deleteProvince,
    getAllImages,
  };
};
