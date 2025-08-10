import Joi from 'joi';

export const cardSchema = Joi.object({
  title: Joi.string().min(2).max(255).required(),
  subtitle: Joi.string().min(2).max(255).required(),
  description: Joi.string().min(2).max(1024).required(),
  phone: Joi.string().min(9).max(15).required(),
  email: Joi.string().email().required(),
  web: Joi.string().uri().required(),
  image: Joi.object({
    url: Joi.string().allow(''),
    alt: Joi.string().allow('')
  }),
  address: Joi.object({
    state: Joi.string().allow(''),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.number().required(),
    zip: Joi.string().allow('')
  })
});
