/**
 * Countrys.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    ctry: {
      type: 'String',
      unique: true,
      required: true,
      description: 'Abreviación del pais'
    },

    cntry: {
      type: 'String',
      unique: true,
      required: true,
      description: 'Abreviación internacional del pais'

    },
    country: {
      type: 'String',
      defaultsTo: '?',
      description: 'Nombre del pais'
    },
    
    countryBlock: {
      type: 'String',
      isIn: ['B', 'U'],
      defaultsTo: 'U',
      description: 'Para bloquear paises '
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    ipsAsigned: {
      collection: 'ipgeos',
      via: 'country'
    }
  },

};

