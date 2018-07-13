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
    // tipo de objeto
    object: {
      type: 'String',
      defaultsTo: '',
    },

    // Numero de secuencia para organizar
    sequence: {
      type: 'number',
      defaultsTo: 0
    },

    // Tipo de mensaje enviado
    typeMess: {
      type: 'string',
    },

    // si es Texto
    text: {
      type: 'boolean',
    },

    // Contenido de Texto
    textString: {
      type: 'string',
      defaultsTo: '',
    },

    textArray: {
      type: 'json',
      defaultsTo: {}
    },

    // si es stiquer
    stikerId: {
      type: 'number',
    },

    // Contenido adjuntos como imagenes, stikers, gits, sonidos, y localizaciónes
    attachments: {
      type: 'json',
      defaultsTo: {}
    },

    // Si el mensaje se ha leido
    read: {
      type: 'number',
      enum: [0,1]
    },

    sendread: {
      type: 'string',
      enum: ['a','b']
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    // Mensaje completo sin editar puro
    messageComplete: {
      type: 'json',
      defaultsTo: {}
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    // id del cliente a quien responderle
    idClient: {
      type: 'string',
      defaultsTo: '',
    },

    // id de la pagina que se utiliza
    idPage: {
      type: 'string',
      defaultsTo: '',
    },

  },

};


// object
// sequence
// typeMess
// text
// textString
// textArray
// stikerId
// attachments
// messageComplete
// idClient
// idPage
