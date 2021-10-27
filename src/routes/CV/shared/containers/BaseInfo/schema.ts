import * as yup from 'yup';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  livingCityId: yup.string().required().nullable(),
  birthDate: yup.string().required().nullable(),
  gender: yup.string().required().nullable(),
  movingCityId: yup.string().nullable()
});

export { schema };
