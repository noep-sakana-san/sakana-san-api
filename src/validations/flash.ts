import { errorMessage } from '@/errors';
import { CreateFlashApi, UpdateFlashApi } from 'src/types';
import * as yup from 'yup';

const create: yup.ObjectSchema<CreateFlashApi> = yup.object({
  imageIds: yup
    .array()
    .of(yup.string().typeError(errorMessage.fields('imageIds').NOT_STRING))
    .required(errorMessage.fields('imageIds').REQUIRED)
    .typeError(errorMessage.fields('imageIds').NOT_ARRAY),
  isVisible: yup
    .boolean()
    .required(errorMessage.fields('isVisible').REQUIRED)
    .typeError(errorMessage.fields('isVisible').NOT_BOOLEAN),
  isFavorite: yup
    .boolean()
    .required(errorMessage.fields('isFavorite').REQUIRED)
    .typeError(errorMessage.fields('isFavorite').NOT_BOOLEAN),
  isAvailable: yup
    .boolean()
    .required(errorMessage.fields('isAvailable').REQUIRED)
    .typeError(errorMessage.fields('isAvailable').NOT_BOOLEAN),
});

const update: yup.ObjectSchema<UpdateFlashApi> = yup.object({
  imageIds: yup
    .array()
    .of(yup.string().typeError(errorMessage.fields('imageIds').NOT_STRING))
    .typeError(errorMessage.fields('imageIds').NOT_ARRAY),
  isVisible: yup
    .boolean()
    .typeError(errorMessage.fields('isVisible').NOT_BOOLEAN),
  isFavorite: yup
    .boolean()
    .typeError(errorMessage.fields('isFavorite').NOT_BOOLEAN),
  isAvailable: yup
    .boolean()
    .typeError(errorMessage.fields('isAvailable').NOT_BOOLEAN),
});

export const flashValidation = {
  create,
  update,
};
