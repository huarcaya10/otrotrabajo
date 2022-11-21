const Joi = require('joi');

//Defini campo ID
const id = Joi.string()
                .uuid();
const nombre = Joi.string()
                  .alphanum()
                  .min(3)
                  .max(15);
const precio=Joi.number()
                .integer()
                .min(18);

const createProductSchema=Joi.object({
  nombre: nombre.required(),
  precio: precio.required()
});

const updateProductSchema=Joi.object({
  nombre: nombre,
  precio:precio
});

const getProductSchema=Joi.object({
  id: id.required()
});

module.exports={createProductSchema, updateProductSchema, getProductSchema};
