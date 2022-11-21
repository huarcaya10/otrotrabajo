const Joi = require('joi');

const id = Joi.string()
              .uuid();
const nombre = Joi.string()//.alphanum()
                  .min(3)
                  .max(30);
const stock = Joi.number()
                  .integer()
                  .min(10);

const createCategoriaSchema = Joi.object({
  nombre : nombre.required(),
  cantidad: cantidad.required()
});
const updateCategoriaSchema = Joi.object({
  nombre : nombre,
  precio: cantidad
});
const getCategoriaSchema = Joi.object({
  id : id.required()
});

module.exports = {createCategoriaSchema,updateCategoriaSchema,getCategoriaSchema}
