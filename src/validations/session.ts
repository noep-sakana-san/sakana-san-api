import { errorMessage } from '@/errors';
import { CreateSessionApi, UpdateSessionApi } from '@/types';
import * as yup from 'yup';

const create: yup.ObjectSchema<CreateSessionApi> = yup.object({
  name: yup
    .string()
    .typeError(errorMessage.fields('name').NOT_STRING)
    .transform((value) => (value === '' ? undefined : value))
    .optional(),
  placeId: yup
    .string()
    .required(errorMessage.fields('place').REQUIRED)
    .typeError(errorMessage.fields('place').NOT_STRING),
  startDate: yup
    .date()
    .required(errorMessage.fields('startDate').REQUIRED)
    .typeError(errorMessage.fields('startDate').NOT_DATE),
  endDate: yup.date().typeError(errorMessage.fields('endDate').NOT_DATE),
  isVisible: yup
    .boolean()
    .required(errorMessage.fields('isVisible').REQUIRED)
    .typeError(errorMessage.fields('isVisible').NOT_BOOLEAN),
});

const update: yup.ObjectSchema<UpdateSessionApi> = yup.object({
  name: yup
    .string()
    .typeError(errorMessage.fields('name').NOT_STRING)
    .transform((value) => (value === '' ? undefined : value))
    .optional(),
  placeId: yup.string().typeError(errorMessage.fields('place').NOT_STRING),
  startDate: yup.date().typeError(errorMessage.fields('startDate').NOT_DATE),
  endDate: yup.date().typeError(errorMessage.fields('endDate').NOT_DATE),
  isVisible: yup
    .boolean()
    .typeError(errorMessage.fields('isVisible').NOT_BOOLEAN),
});

export const sessionValidation = {
  create,
  update,
};
