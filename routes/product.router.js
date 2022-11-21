const express = require('express');
const router = express.Router();

const  validatorHandler =  require('../middlewares/validator.handler');
const {createProductSchema,updateProductSchema,getProductSchema} = require('../schemas/product.schema');

const ProductService = require('../services/product.service')
const service = new ProductService();

router.get('/', async (req,res)=>{
  const products = await service.find();
  res.status(200).json(products);
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
              validatorHandler(getProductSchema,'params'),
              async (req,res, next)=>{
  try{
    const { id }= req.params;
    const product = await service.findOne(id);
    res.status(200).json(product);
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
             validatorHandler(createProductSchema,'body'),
              async (req,res)=>{
  const body = req.body;
  const nuevoProducto = await service.create(body);
  res.status(201).json({
    message: 'creado',
    nuevoProducto
  });
})
router.patch('/:id',
                validatorHandler(getProductSchema,'params'),
                validatorHandler(updateProductSchema,'body'),
                async (req,res, next)=>{
  try{
    const {id} = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.status(200).json({
      message: 'actualizado',
      product
    });
  }catch(error){
    next(error);
  }
});

router.delete('/:id',
                  validatorHandler(updateProductSchema,'body'),
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

module.exports = router;
