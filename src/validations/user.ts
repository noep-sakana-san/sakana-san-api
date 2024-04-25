import { errorMessage } from '@/errors';
import { AuthLoginApi, RegisterApi, UpdateUserApi } from '@/types';
import * as yup from 'yup';
import { genericsValidation } from './generics';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const update: yup.ObjectSchema<UpdateUserApi> = yup.object({
  username: yup
    .string()
    .min(1, errorMessage.fields('username').REQUIRED)
    .optional()
    .default(undefined),
  paragraph1: yup
    .string()
    .optional()
    .transform((value) => (value === '' ? undefined : value))
    .default(undefined),
  paragraph2: yup
    .string()
    .optional()
    .transform((value) => (value === '' ? undefined : value))
    .default(undefined),
  placeId: yup
    .string()
    .min(1, errorMessage.fields('placeId').REQUIRED)
    .optional()
    .default(undefined),
  email: yup
    .string()
    .email(errorMessage.fields('email').NOT_EMAIL)
    .transform((value) => (value === '' ? undefined : value))
    .optional(),
  phone: yup
    .string()
    .matches(phoneRegExp, errorMessage.fields('phone').NOT_PHONE)
    .transform((value) => (value === '' ? undefined : value))
    .optional(),
  instagram: yup
    .string()
    .url(errorMessage.fields('instagram').NOT_URL)
    .transform((value) => (value === '' ? undefined : value))
    .optional(),
  facebook: yup
    .string()
    .url(errorMessage.fields('facebook').NOT_URL)
    .transform((value) => (value === '' ? undefined : value))
    .optional(),
});

const create: yup.ObjectSchema<RegisterApi> = yup.object({
  password: genericsValidation.password.required(
    errorMessage.fields('password').REQUIRED,
  ),
  username: yup
    .string()
    .required(errorMessage.fields('username').REQUIRED)
    .typeError(errorMessage.fields('username').NOT_STRING),
});

const login = yup.object<AuthLoginApi>().shape({
  username: yup
    .string()
    .required(errorMessage.fields('username').REQUIRED)
    .typeError(errorMessage.fields('username').NOT_STRING),
  password: genericsValidation.password.required(
    errorMessage.fields('password').REQUIRED,
  ),
});

export const userValidation = {
  update,
  login,
  create,
};
