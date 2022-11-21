const express = require('express');
const router = express.Router();

const  validatorHandler =  require('../middlewares/validator.handler');
const {createCategoriaSchema,updateCategoriaSchema,getCategoriaSchema} = require('../schemas/categoria.schema');

const CategoriaService = require('../services/categoria.service')
const service = new CategoriaService();

router.get('/', async (req,res)=>{
  const categorias = await service.find();
  res.status(200).json(categorias);
});

// router.get('/:id', async (req,res, next)=>{
//   try{
//     const { id }= req.params;
//     const product = await service.findOne(id);
//     res.status(200).json(product);
//   }catch(error){
//     next(error);
//   }
// });
router.get('/:id',
              validatorHandler(getCategoriaSchema,'params'),
              async (req,res, next)=>{
  try{
    const { id }= req.params;
    const categoria = await service.findOne(id);
    res.status(200).json(categoria);
  }catch(error){
    next(error);
  }
});

// router.post('/', async (req,res)=>{
//   const body = req.body;
//   const nuevoProducto = await service.create(body);
//   res.status(201).json({
//     message: 'creado',
//     data: nuevoProducto
//   });
// })
router.post('/',
             validatorHandler(createCategoriaSchema,'body'),
              async (req,res)=>{
  const body = req.body;
  const nuevoCategoria = await service.create(body);
  res.status(201).json({
    message: 'creado',
    nuevoCategoria
  });
})
router.patch('/:id',
                validatorHandler(getCategoriaSchema,'params'),
                validatorHandler(updateCategoriaSchema,'body'),
                async (req,res, next)=>{
  try{
    const {id} = req.params;
    const body = req.body;
    const categoria = await service.update(id, body);
    res.status(200).json({
      message: 'actualizado',
      categoria
    });
  }catch(error){
    next(error);
  }
});

router.delete('/:id',
                  validatorHandler(updateCategoriaSchema,'body'),
                  async (req,res, next)=>{
  try{
    const {id} = req.params;
    const rta = await service.delete(id);
    res.json({
      message: 'eliminado',
      rta
    });
  }catch(error){
    next(error);
  }
});
