import * as yup from 'yup';

const schema = yup.object().shape({
  position: yup.string().required(),
  skills: yup.array().min(1, 'Заполните хотя бы одну область'),
  nativeLanguageId: yup.string().required().nullable()
});

export { schema };
