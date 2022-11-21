const crypto = require('crypto');

class VentaService{

  constructor(){
    this.ventas = [];
    this.generate(10);

  }
  generate(limit){
    for (let index = 0; index < limit; index++){
      this.ventas.push({
        id: crypto.randomUUID(),
        nombre: 'venta' + index,
        fechaEntrega: new Date(),
        fechaVenta: new Date(),
        costoTotal: 10 + Math.floor(Math.random()*190),
        delivery: 'delivery' + index,
        idCliente: 'cliente' + index,
        idPago: 'pago' + index
      });
    }
  }
  create(data){
    const nuevoVenta = {
      id: crypto.randomUUID(),
      ...data
    };
    this.ventas.push(nuevoVenta);
    return nuevoVenta;
  }
  find(){
    return this.ventas;
  }
  findOne(id){
    return this.ventas.find(venta => {
      return venta.id === id;
    })
  }
  update(id, changes){
    const index = this.ventas.findIndex(venta =>{
      return venta.id === id;
    });
    if (index === -1){
      throw new Error('sale not found');
    }
    const venta = this.ventas[index];
    this.ventas[index] = {
      ...venta,
      ...changes
    };
    return this.ventas[index];
  }
  delete(id){
    const index = this.ventas.findIndex(venta =>{
      return venta.id === id;
    });
    if (index === -1){
      throw new Error('sale not found');
    }
    this.ventas.splice(index,1);
    return { id };
  }
}
module.exports = VentaService;
