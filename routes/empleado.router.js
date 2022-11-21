const express = require ('express');
const router = express.Router();
const EmpleadosService = require('../services/empleados.service')
const service = new EmpleadosService();

router.get('/', (req, res) => {
  const empleados = service.find();
    res.status(200).json(empleados);
  });


  router.get('/:id', (req, res) => {
    const { id } = req.params;
    const empleado = service.findOne(id);
    if (empleado === undefined){
      res.status(404).json({
        message: 'empleado not found',
        id
      });
    }
    res.status(200).json(empleado);
  });

  router.post('/',(req, res) => {
    const body = req.body;
    const nuevoEmpleado = service.create(body);
    res.status(201).json( {
      message: 'creado',
      nuevoEmpleado
    });
  });

  router.patch('/:id',(req, res) => {
   const body = req.body;
   const { id } = req.params;
   const empleado = service.update(id, body);
    res.status(200).json( {
      message: 'actualizado',
      empleado
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
