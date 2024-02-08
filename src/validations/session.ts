import { errorMessage } from '@/errors';
import { CreateSessionApi, UpdateSessionApi } from '@/types/api/Session';
import * as yup from 'yup';

const create: yup.ObjectSchema<CreateSessionApi> = yup.object({
  name: yup.string().typeError(errorMessage.fields('name').NOT_STRING),
  placeId: yup
    .string()
    .required(errorMessage.fields('place').REQUIRED)
    .typeError(errorMessage.fields('place').NOT_STRING),
  startDate: yup
    .date()
    .required(errorMessage.fields('startDate').REQUIRED)
    .typeError(errorMessage.fields('startDate').NOT_DATE),
  endDate: yup
    .date()
    .required(errorMessage.fields('endDate').REQUIRED)
    .typeError(errorMessage.fields('endDate').NOT_DATE),
});

const update: yup.ObjectSchema<UpdateSessionApi> = yup.object({
  name: yup.string().typeError(errorMessage.fields('name').NOT_STRING),
  placeId: yup.string().typeError(errorMessage.fields('place').NOT_STRING),
  startDate: yup.date().typeError(errorMessage.fields('startDate').NOT_DATE),
  endDate: yup.date().typeError(errorMessage.fields('endDate').NOT_DATE),
});

export const sessionValidation = {
  create,
  update,
};
