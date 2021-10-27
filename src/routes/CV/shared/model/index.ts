export type ISubHeader = {
  id: string;
  title: string;
};

export type IStepHeader = {
  baseHeader: string;
  subHeaders?: ISubHeader[];
};

export type IStepHeadersType = {
  [key: string]: IStepHeader;
};
