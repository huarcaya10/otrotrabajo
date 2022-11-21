const express = require ('express');
const router = express.Router();
const clientesService =require('../services/clientes.service')
const service = new clientesService();


router.get('/', (req, res) => {
    const clientes = service.find();
      res.status(200).json(clientes);
    });

    router.get('/:id', (req, res) => {
        const { id } = req.params;
        const cliente = service.findOne(id);
        if (cliente === undefined){
          res.status(404).json({
            message: 'cliente not found',
            id
          });
        }
        res.status(200).json(cliente);
      });

      router.post('/',(req, res) => {
        const body = req.body;
        const nuevocliente = service.create(body);
        res.status(201).json( {
          message: 'creado',
          nuevocliente
        });
      });

      router.patch('/:id',(req, res) => {
        const body = req.body;
        const { id } = req.params;
        const cliente = service.update(id, body);
         res.status(200).json( {
           message: 'actualizado',
           cliente
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
