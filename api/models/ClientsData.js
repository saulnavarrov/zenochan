/**
 * ClientsData.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    // nombre:
  "first_name": {
    type: 'string',
    defaultsTo: '',
    description: '',
  },
  
  // Apellidos
  "last_name": {
    type: 'string',
    defaultsTo: '',
    description: '',
  },
  
  // imagen
  "profile_pic": {
    type: 'string',
    defaultsTo: '',
    description: '',
  },
  
  // Localización en el Idioma
  "locale": {
    type: 'string',
    defaultsTo: 'es',
    description: '',
  },
  
  // Zona Horaria de la persona
  "timezone": {
    type: 'number',
    defaultsTo: 0,
    description: '',
  },
  
  // Si es mujer o hombre
  "gender": {
    type: 'string',
    defaultsTo: 'none',
    description: '',
  },

  // Activa la personas
  active: {
    type: 'boolean',
    defaultsTo: true,
    description: '',
  },
  
  // Id de conexion
  idsfbs: {
    model: 'clientsid'
  },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

