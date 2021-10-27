import { axiosInstance } from 'config/axios';

import { ICVData, ICVDataMap } from '../models/types/cv';
import { IControllerProps, IPostResponse } from './model';

class CVService implements IControllerProps {
  url = (id?: string) => `cvs${id ? '/' + id : ''}.json`;

  public getAllCVs() {
    return axiosInstance.get<ICVDataMap>(this.url());
  }

  public postCV(data: ICVData) {
    return axiosInstance.post<IPostResponse>(this.url(), data);
  }

  public getCVbyId(id: string) {
    return axiosInstance.get<ICVData>(this.url(id));
  }

  public patchCV(id: string, data: Partial<ICVData>) {
    return axiosInstance.patch<typeof data>(this.url(id), data);
  }

  public deleteCVbyId(id: string) {
    return axiosInstance.delete(this.url(id));
  }
}

export default new CVService();
