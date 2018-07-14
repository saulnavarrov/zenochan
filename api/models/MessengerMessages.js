/**
 * MessengerMessages.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    // 
    object: {
      type: 'String',
      defaultsTo: '',
      description: 'tipo de objeto'
    },

    // 
    sequence: {
      type: 'number',
      defaultsTo: 0,
      description: 'Numero de secuencia para organizar'
    },

    // 
    typeMess: {
      type: 'string',
      description: 'Tipo de mensaje enviado'
    },

    // 
    text: {
      type: 'boolean',
      description: 'si es Texto o no lo es, para recalcar si responderles o no'
    },

    // 
    textString: {
      type: 'string',
      defaultsTo: '',
      description: 'Contenido de Texto'
    },

    // 
    textArray: {
      type: 'json',
      defaultsTo: {},
      description: 'array del texto'
    },

    // 
    stikerId: {
      type: 'number',
      description: 'codigo del stiker para identificarlos mas luego'
    },

    // 
    attachments: {
      type: 'json',
      defaultsTo: {},
      description: 'Contenido adjuntos como imagenes, stikers, gits, sonidos, y localizaciónes'
    },

    // 
    read: {
      type: 'number',
      isIn: [0,1],
      description: 'Si el mensaje se ha leido'
    },

    // Si el mensaje fue enviado o recivido
    sendread: {
      type: 'string',
      isIn: ['submit', 'toReceibe'],
      description: 'Si el mensaje fue enviado o recivido'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    // 
    messageComplete: {
      type: 'json',
      defaultsTo: {},
      description: 'Mensaje completo sin editar puro'
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    // 
    idClient: {
      type: 'string',
      // collection: ''
      defaultsTo: '',
      description: 'id del cliente a quien responderle'
    },

    // 
    idPage: {
      type: 'string',
      defaultsTo: '',
      description: 'id de la pagina que se utiliza'
    },

  },

};