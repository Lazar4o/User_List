import * as Yup from 'yup';

export const userValidationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
  address: Yup.object().shape({
    city: Yup.string().required('City is required'),
    street: Yup.string().required('Street is required'),
    suite: Yup.string().required('Suite is required'),
  }),
});
