import { errorMessage } from '@/errors';
import { CreatePlaceApi, UpdatePlaceApi } from '@/types';
import * as yup from 'yup';

const create: yup.ObjectSchema<CreatePlaceApi> = yup.object({
  name: yup.string().required(errorMessage.fields('name').REQUIRED),
  addressId: yup.string().required(errorMessage.fields('address').REQUIRED),
});

const update: yup.ObjectSchema<UpdatePlaceApi> = yup.object({
  name: yup.string().typeError(errorMessage.fields('name').NOT_STRING),
  addressId: yup.string().typeError(errorMessage.fields('address').NOT_STRING),
});

export const placeValidation = {
  create,
  update,
};
