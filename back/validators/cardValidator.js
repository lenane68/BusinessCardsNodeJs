import Joi from 'joi';

export const cardSchema = Joi.object({
  title: Joi.string().min(2).max(255).required(),
  subtitle: Joi.string().min(2).max(255),
  description: Joi.string().min(2).max(1024),
  phone: Joi.string().min(9).max(15),
  email: Joi.string().email(),
  web: Joi.string().uri(),
  image: Joi.object({
    url: Joi.string().uri(),
    alt: Joi.string()
  }),
  address: Joi.object({
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.number().required()
  })
});
