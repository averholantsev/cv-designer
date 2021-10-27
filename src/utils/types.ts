import { IStepHeader } from 'routes/CV/shared/model';

// eslint-disable-next-line @typescript-eslint/naming-convention
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export interface IFormData {
  stepHeaders: IStepHeader;
  onSubmit: () => void;
  onBack: () => void;
}
