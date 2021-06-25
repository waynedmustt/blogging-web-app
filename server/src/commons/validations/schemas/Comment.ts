import * as Joi from 'joi';

export const createCommentSchema = Joi.object({
  id: Joi.number().optional(),
  comment: Joi.required(),
  user: Joi.required(),
  blog: Joi.required(),
});
