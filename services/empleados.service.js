const crypto = require('crypto');


class EmpleadosService{

    constructor(){
        this.empleados=[];
        this.generate(10);

    }

    generate(limite){
        for (let index = 0; index < limite ; index ++)
        this.empleados.push({
                id: crypto.randomUUID(),
                nombre: 'empleados' + index,
                apellido: 'empleados' + index,
                telefono: 10 + Math.floor(Math.random()*190),
                sueldo: 10 + Math.floor(Math.random()*190)
        })

    }

   create(data){
    const nuevoEmpleado = {
        id: crypto.randomUUID(),
        ...data
      };
      this.empleados.push(nuevoEmpleado);
      return nuevoEmpleado;

    }

   find(){
    return this.empleados;
   }

   findOne(id){
     return this.empleados.find(empleado => {
        return empleado.id === id;
     });
   }

   update(id, changes){
    const index = this.empleados.findIndex(empleado =>{
        return empleado.id === id;
      });
      if (index === -1){
        throw new Error('empleado not found');
      }
      const empleado = this.empleados[index];
      this.empleados[index] = {
        ...empleado,
        ...changes
      };
      return this.empleados[index];
   }
   delete(id){
    const index = this.empleados.findIndex(empleado =>{
        return empleado.id === id;
      });
      if (index === -1){
        throw new Error('empleado not found');
      }
      this.empleados.splice(index,1);
      return { id };
   }
  }

  module.exports= EmpleadosService;
