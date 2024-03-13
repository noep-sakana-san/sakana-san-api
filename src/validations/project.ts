import { errorMessage } from '@/errors';
import { CreateProjectApi, ProjectType, UpdateProjectApi } from 'src/types';
import * as yup from 'yup';

const create: yup.ObjectSchema<CreateProjectApi> = yup.object({
  type: yup
    .string<ProjectType>()
    .oneOf(Object.values(ProjectType), errorMessage.fields('type').NOT_VALID)
    .required(errorMessage.fields('type').REQUIRED),
  date: yup
    .date()
    .required(errorMessage.fields('date').REQUIRED)
    .typeError(errorMessage.fields('date').NOT_DATE),
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
  title: yup.string().typeError(errorMessage.fields('title').NOT_STRING),
  description: yup
    .string()
    .typeError(errorMessage.fields('description').NOT_STRING),
  healedIds: yup
    .array()
    .of(yup.string())
    .typeError(errorMessage.fields('afterImageIds').NOT_ARRAY),
  placeId: yup.string().typeError(errorMessage.fields('place').NOT_STRING),
});

const update: yup.ObjectSchema<UpdateProjectApi> = yup.object({
  type: yup
    .string<ProjectType>()
    .oneOf(Object.values(ProjectType), errorMessage.fields('type').NOT_VALID)
    .optional(),
  date: yup.date().typeError(errorMessage.fields('date').NOT_DATE),
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
  title: yup.string().typeError(errorMessage.fields('title').NOT_STRING),
  description: yup
    .string()
    .typeError(errorMessage.fields('description').NOT_STRING),
  healedIds: yup
    .array()
    .of(yup.string())
    .typeError(errorMessage.fields('afterImageIds').NOT_ARRAY),
  placeId: yup.string().typeError(errorMessage.fields('place').NOT_STRING),
});

export const projectValidation = {
  create,
  update,
};
