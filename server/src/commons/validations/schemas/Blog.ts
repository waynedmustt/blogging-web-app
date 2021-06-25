import * as Joi from 'joi';

export const createBlogSchema = Joi.object({
  id: Joi.number().optional(),
  code: Joi.disallow(),
  title: Joi.required(),
  content: Joi.required(),
  status: Joi.string(),
  view: Joi.disallow(),
  user: Joi.required(),
});
