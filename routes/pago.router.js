const express = require ('express');
const router = express.Router();
const PagoService = require('../services/pago.service')
const service = new PagoService();

router.get('/', (req, res) => {
  const pagos = service.find();
    res.status(200).json(pagos);
  });


  router.get('/:id', (req, res) => {
    const { id } = req.params;
    const pago = service.findOne(id);
    if (pago === undefined){
      res.status(404).json({
        message: 'Pago no encontrado',
        id
      });
    }
    res.status(200).json(pago);
  });

  router.post('/',(req, res) => {
    const body = req.body;
    const nuevoPago = service.create(body);
    res.status(201).json( {
      message: 'creado',
      nuevoPago
    });
  });

  router.patch('/:id',(req, res) => {
   const body = req.body;
   const { id } = req.params;
   const pago = service.update(id, body);
    res.status(200).json( {
      message: 'Actualizado',
      pago
    });
  });

  router.delete('/:id',(req, res) => {
    const { id } = req.params;
    const rta= service.delete(id);
     res.status(200).json( {
       message: 'eliminado',
       rta
     });
   });

  module.exports= router;
