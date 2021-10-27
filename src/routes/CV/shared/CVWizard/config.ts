import { IStepHeadersType } from 'routes/CV/shared/model';

export const stepHeaders: IStepHeadersType = {
  baseInfo: {
    baseHeader: 'Основная информация',
    subHeaders: [
      { id: 'contactsInfo', title: 'Контактные данные' },
      { id: 'personalInfo', title: 'Персональные данные' }
    ]
  },
  educationInfo: {
    baseHeader: 'Образование',
    subHeaders: [
      { id: 'profession', title: 'Специальность' },
      { id: 'educationalInstitution', title: 'Учебное учреждение' },
      { id: 'languageProficiency', title: 'Владение языками' }
    ]
  },
  workInfo: {
    baseHeader: 'Опыт работы',
    subHeaders: [
      { id: 'workPlase', title: 'Место работы' },
      { id: 'keySkills', title: 'Ключевые навыки' },
      { id: 'aboutSelf', title: 'О себе' }
    ]
  },
  avatarAdd: {
    baseHeader: 'Добавление Фотографии'
  }
};
