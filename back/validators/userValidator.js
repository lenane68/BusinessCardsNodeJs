import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.object({
    first: Joi.string().min(2).max(50).required(),
    last: Joi.string().min(2).max(50).required()
  }),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().min(9).max(15),
  address: Joi.object({
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.number().required()
  }),
  isBusiness: Joi.boolean(),
  isAdmin: Joi.boolean()
});
