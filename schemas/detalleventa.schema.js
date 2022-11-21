const Joi = require('joi');

const id = Joi.string()
              .uuid();
const nombre = Joi.string()//.alphanum()
                  .min(3)
                  .max(30);
const cantidad = Joi.number()
                  .integer()
                  .min(10);

const createDetalleSchema = Joi.object({
  nombre : nombre.required(),
  cantidad: cantidad.required()
});
const updateDetalleSchema = Joi.object({
  nombre : nombre,
  precio: cantidad
});
const getDetalleSchema = Joi.object({
  id : id.required()
});

module.exports = {createDetalleSchema,updateDetalleSchema,getDetalleSchema}
