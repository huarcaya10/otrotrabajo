const express = require('express');
const router = express.Router();
const VentaService = require('../services/venta.service')
const service = new VentaService();

router.get('/',(req,res)=>{
  const ventas = service.find();
  res.status(200).json(ventas);
});

router.get('/:id',(req,res)=>{
  const { id }= req.params;
  const venta = service.findOne(id);
  if (venta === undefined){
    res.status(404).json({
      message: 'sale not found',
      id
    })
  }
  res.status(201).json(venta);
});

router.post('/',(req,res)=>{
  const body = req.body;
  const nuevoVenta = service.create(body);
  res.status(201).json({
    message: 'creado',
    data: nuevoVenta
  });
})
router.patch('/:id',(req,res)=>{
  const {id} = req.params;
  const body = req.body;
  const venta = service.update(id, body);
  res.status(200).json({
    message: 'actualizado',
    venta
  });
})
router.delete('/:id',(req,res)=>{
  const {id} = req.params;
  const rta = service.delete(id);
  res.json({
    message: 'eliminado',
    rta
  });
})

module.exports = router;
