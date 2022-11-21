const {rejects }=require("assert");
const crypto = require('crypto');
const boom = require('@hapi/boom');
//const { brotliCompress } = require('zlib');

class ProductService{

  constructor(){
    this.products = [];
    this.generate(10);

  }
  async generate(limit){
    for (let index = 0; index < limit; index++){
      this.products.push({
        id: crypto.randomUUID(),
        nombre: 'product' + index,
        precio: 10 + Math.floor(Math.random()*190),
        estaBloqueado: Math.random() < 0.25
      });
    }
  }
  async create(data){
    const nuevoProducto = {
      id: crypto.randomUUID(),
      ...data
    };
    this.products.push(nuevoProducto);
    return nuevoProducto;
  }
  async find(){
    return this.products;
  }
  async findOne(id){

    const producto= this.products.find((product)=>{
      return product.id===id;
    });
    if (!producto){
      throw boom.notFound('producto no encotnrado');
    }
    return producto;
  }
  async update(id, changes){
    const index = this.products.findIndex(product =>{
      return product.id === id;
    });
    if (index === -1){
      throw boom.notFound('producto no encotnrado');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }
  async delete(id){
    const index = this.products.findIndex(product =>{
      return product.id === id;
    });
    if (index === -1){
      throw boom.notFound('producto no encotnrado');
    }
    this.products.splice(index,1);
    return { id };
  }
}
module.exports = ProductService;
