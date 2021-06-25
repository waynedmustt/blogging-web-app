import * as Joi from 'joi';

export const updateViewBlogSchema = Joi.object({
  id: Joi.number().optional(),
  view: Joi.required(),
});
