import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  id: Joi.number().optional(),
  firstName: Joi.required(),
  lastName: Joi.required(),
  username: Joi.string(),
  password: Joi.string(),
  isActive: Joi.boolean(),
  role: Joi.required(),
});
