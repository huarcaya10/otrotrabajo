const crypto = require('crypto');

class clientesService{
    constructor(){
        this.clientes=[];
        this.generate(10);

    }

    generate(limite){
        for (let index = 0; index < limite ; index ++)
        this.clientes.push({
                id: crypto.randomUUID(),
                razonSocial: 'clientes' + index,
                nombre: 'clientes' + index,
                apellido: 'clientes' + index,
                telefono: 10 + Math.floor(Math.random()*190),
                DNI: 10 + Math.floor(Math.random()*190)

        })
    }

    create(data){
        const nuevocliente = {
            id: crypto.randomUUID(),
            ...data
          };
          this.clientes.push(nuevocliente);
          return nuevocliente;

        }

       find(){
        return this.clientes;
       }

       findOne(id){
         return this.clientes.find(cliente => {
            return cliente.id === id;
         });
       }


   update(id, changes){
    const index = this.clientes.findIndex(cliente =>{
        return cliente.id === id;
      });
      if (index === -1){
        throw new Error('cliente not found');
      }
      const cliente = this.clientes[index];
      this.clientes[index] = {
        ...cliente,
        ...changes
      };
      return this.clientes[index];
   }
   delete(id){
    const index = this.clientes.findIndex(cliente =>{
        return cliente.id === id;
      });
      if (index === -1){
        throw new Error('product not found');
      }
      this.clientes.splice(index,1);
      return { id };
   }



}
module.exports=clientesService;
