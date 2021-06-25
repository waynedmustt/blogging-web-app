import * as Joi from 'joi';

export const updateBlogSchema = Joi.object({
  id: Joi.number().optional(),
  title: Joi.optional(),
  content: Joi.optional(),
  status: Joi.optional(),
  user: Joi.optional(),
});
