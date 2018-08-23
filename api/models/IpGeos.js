/**
 * IpGeos.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    ipFrom: {
      type: 'number',
      required: true,
      description: 'Rango de IP de arranque'
    },

    ipTo: {
      type: 'number',
      required: true,
      description: 'Rango de IP final',
    },

    assigned: {
      type: 'String',
      defaultsTo: '?',
      description: 'Cuantas IP`s cuantas ip fueron asignadas en este rango'
    },

    registry: {
      type: 'String',
      defaultsTo: '?',
      description: 'Organización que registra la ip'

    },

    ipBlock: {
      type: 'String',
      isIn: ['B', 'U'],
      defaultsTo: 'U',
      description: 'Para bloquear paises que llegen a conflictos'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    country: {
      model: 'countrys',
      description: 'Conexión con el modelo de Countrys (Paises)'
    }
  },

};

