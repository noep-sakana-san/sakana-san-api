import { errorMessage } from '@/errors';
import { AuthLoginApi, RegisterApi, UpdateUserApi } from '@/types';
import * as yup from 'yup';
import { genericsValidation } from './generics';

const update: yup.ObjectSchema<UpdateUserApi> = yup.object({
  username: yup
    .string()
    .min(1, errorMessage.fields('username').REQUIRED)
    .optional()
    .default(undefined),
  placeId: yup
    .string()
    .min(1, errorMessage.fields('placeId').REQUIRED)
    .optional()
    .default(undefined),
  email: yup.string().email(errorMessage.fields('email').NOT_EMAIL).optional(),
  phone: yup.string().optional(),
  instagram: yup
    .string()
    .url(errorMessage.fields('instagram').NOT_URL)
    .optional(),
  facebook: yup
    .string()
    .url(errorMessage.fields('facebook').NOT_URL)
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
