import { errorMessage } from '@/errors';
import { CreateTattooApi, UpdateTattooApi } from 'src/types';
import * as yup from 'yup';

const create: yup.ObjectSchema<CreateTattooApi> = yup.object({
  date: yup
    .date()
    .required(errorMessage.fields('date').REQUIRED)
    .typeError(errorMessage.fields('date').NOT_DATE),
  imageIds: yup
    .array()
    .of(yup.string())
    .required(errorMessage.fields('imageIds').REQUIRED)
    .typeError(errorMessage.fields('imageIds').NOT_ARRAY),
  isVisible: yup
    .boolean()
    .required(errorMessage.fields('isVisible').REQUIRED)
    .typeError(errorMessage.fields('isVisible').NOT_BOOLEAN),
  title: yup.string().typeError(errorMessage.fields('title').NOT_STRING),
  description: yup
    .string()
    .typeError(errorMessage.fields('description').NOT_STRING),
  afterImageIds: yup
    .array()
    .of(yup.string())
    .typeError(errorMessage.fields('afterImageIds').NOT_ARRAY),
  placeId: yup.string().typeError(errorMessage.fields('place').NOT_STRING),
});

const update: yup.ObjectSchema<UpdateTattooApi> = yup.object({
  date: yup.date().typeError(errorMessage.fields('date').NOT_DATE),
  imageIds: yup
    .array()
    .of(yup.string())
    .typeError(errorMessage.fields('imageIds').NOT_ARRAY),
  isVisible: yup
    .boolean()
    .typeError(errorMessage.fields('isVisible').NOT_BOOLEAN),
  title: yup.string().typeError(errorMessage.fields('title').NOT_STRING),
  description: yup
    .string()
    .typeError(errorMessage.fields('description').NOT_STRING),
  afterImageIds: yup
    .array()
    .of(yup.string())
    .typeError(errorMessage.fields('afterImageIds').NOT_ARRAY),
  placeId: yup.string().typeError(errorMessage.fields('place').NOT_STRING),
});

export const tattooValidation = {
  create,
  update,
};
