import moment from 'moment';

export function getAgeString(date: string | number): string {
  const age = moment().diff(date, 'years');

  return `${age} ${declOfNum(age, ageList)}`;
}

const ageList = ['год', 'года', 'лет'];

function declOfNum(number: number, titles: string[]) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
  ];
}

type IOptionsType = Array<{ id: string; name: string }>;

export function _get(optiopns: IOptionsType, id: string): string {
  const value = optiopns.find(item => item.id === id);

  return value?.name || 'Запись не найдена';
}
