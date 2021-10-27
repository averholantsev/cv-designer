import * as yup from 'yup';

const schema = yup.object().shape({
  workPlace: yup.array().of(
    yup.object().shape({
      yearStart: yup.string().matches(/(^$)|(^[0-9]{4}$)/g, 'Неверный формат года'),
      yearEnd: yup.string().matches(/(^$)|(^[0-9]{4}$)/g, 'Неверный формат года')
    })
  )
});

export { schema };
