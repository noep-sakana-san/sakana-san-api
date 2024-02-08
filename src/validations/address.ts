import { errorMessage } from '@/errors';
import { CreateAddressApi, UpdateAddressApi } from 'src/types';
import * as yup from 'yup';

const create: yup.ObjectSchema<CreateAddressApi> = yup.object({
  street: yup
    .string()
    .required(errorMessage.fields('street').REQUIRED)
    .typeError(errorMessage.fields('street').NOT_STRING),
  city: yup
    .string()
    .required(errorMessage.fields('city').REQUIRED)
    .typeError(errorMessage.fields('city').NOT_STRING),
  zipCode: yup
    .string()
    .required(errorMessage.fields('zipCode').REQUIRED)
    .typeError(errorMessage.fields('zipCode').NOT_STRING),
  country: yup
    .string()
    .required(errorMessage.fields('country').REQUIRED)
    .typeError(errorMessage.fields('country').NOT_STRING),
});

const update: yup.ObjectSchema<UpdateAddressApi> = yup.object({
  street: yup.string().typeError(errorMessage.fields('street').NOT_STRING),
  city: yup.string().typeError(errorMessage.fields('city').NOT_STRING),
  zipCode: yup.string().typeError(errorMessage.fields('zipCode').NOT_STRING),
  country: yup.string().typeError(errorMessage.fields('country').NOT_STRING),
});

export const addressValidation = {
  create,
  update,
};
