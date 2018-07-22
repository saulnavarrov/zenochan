/**
 * MessengerFunctions.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 * Funciones ineditas para ejecutar en linea sin interrumpir la programación.
 */

module.exports = {

  schema: true,
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    name: {
      type: 'string',
      unique: true,
      description: 'nombre de la funcion con la que se llamara para la busqueda'
      +'esta debe ser unica.'
    },

    description: {
      type: 'string',
      defaultsTo: '',
      description: 'descripcion corta sobre la funcion que estas creando'
    },

    countUso: {
      type: 'number',
      defaultsTo: 0,
      description: 'Cantidad de veces usado actualizado por cada vez que se usa'
    },

    autor: {
      type: 'string',
      defaultsTo: 'NN',
      description: 'Nombre de la persona que escribe el codigo'
    },

    a: {
      type: 'string',
      isIn: ['a', 'i', 'r'],
      defaultsTo: 'd',
      description: 'Controla que funcion esta activa, desactivada o en revision para organizarla'
      +'a: active'
      +'i: inactive'
      +'r: revision'
      +'Este ultimo la "r" devolvera la una alvertencia sobre lo que se esta realizando.'
    },

    d: {
      type: 'string',
      isIn: ['a', 'i'],
      defaultsTo: 'i',
      description: 'Permitira activar o desactivar el modo de depuración para visualizar todos los logs'
      +'del sistema que se van creando'
      +'a: active'
      +'i: inactive'
    }
    


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

