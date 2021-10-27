export interface IBaseInfo {
  firstName: string;
  lastName: string;
  livingCityId: string;
  birthDate: string;
  gender: 'male' | 'female';
  relocation?: 'impossible' | 'possible' | 'desirable';
  businessTripReady?: 'never' | 'ready' | 'sometimes';
  movingCityId?: string;
}

export type Education = {
  id?: string;
  schoolTypeId?: string;
  institutionName?: string;
  finishYear?: string;
  faculty?: string;
  specialization?: string;
};

export interface IEducationInfo {
  position: string;
  salary?: string;
  moneyTypeId: 'rub' | 'usd' | 'eur';
  skills: string[];
  education?: Education[];
  nativeLanguageId: string;
  foreignLanguages?: string[];
}

export type WorkPlace = {
  id?: string;
  monthStart?: string;
  yearStart?: string;
  monthEnd?: string;
  yearEnd?: string;
  company?: string;
  regionId?: string | null;
  site?: string;
  position?: string;
  positionDuties?: string;
};
export interface IWorkInfo {
  workPlace?: WorkPlace[];
  keySkills?: string[];
  aboutSelf?: string;
  haveCar?: boolean;
  licenseA?: boolean;
  licenseB?: boolean;
  licenseC?: boolean;
  licenseD?: boolean;
  licenseE?: boolean;
  licenseBE?: boolean;
  licenseCE?: boolean;
  licenseDE?: boolean;
  portfolio?: string;
}

export interface IAvatarAdd {
  attachmentData?: File;
  url?: string;
}

export type IAdditionalInfo = {
  createDate: number;
};

export interface ICVData {
  base: IBaseInfo;
  education: IEducationInfo;
  workplace: IWorkInfo;
  avatar: IAvatarAdd;
  additional: IAdditionalInfo;
}

export interface ICVDataMap {
  [key: string]: ICVData;
}
