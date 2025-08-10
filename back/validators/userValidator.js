import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.object({
    first: Joi.string().min(2).max(50).required(),
    middle: Joi.string().allow(''),
    last: Joi.string().min(2).max(50).required()
  }),
  isBusiness: Joi.boolean().default(false),
  isAdmin: Joi.boolean().default(false),
  phone: Joi.string().min(9).max(15).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  address: Joi.object({
    state: Joi.string().allow(''),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.number().required(),
    zip: Joi.string().allow('')
  }),
  image: Joi.object({
    url: Joi.string().allow(''),
    alt: Joi.string().allow('')
  })
});
