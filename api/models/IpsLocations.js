/**
 * IpsLocations.js
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

    "query": {
      type: 'String',
      defaultsTo: '',
      unique: true,
      description: `Dirección ip `
    },

    "as": {
      type: 'String',
      defaultsTo: '',
      description: ``
    },

    "city": {
      type: 'String',
      defaultsTo: '',
      description: `Cuidad de la ip`
    },

    "country": {
      type: 'String',
      defaultsTo: '',
      description: `Pais de la ip`
    },

    "countryCode": {
      type: 'String',
      defaultsTo: '',
      description: `Iniciales del pais ej; Colombia = CO`
    },

    "isp": {
      type: 'String',
      defaultsTo: '',
      description: `Compañia proveedora del a ip`
    },

    "lat": {
      type: 'Number',
      defaultsTo: 0,
      description: `Latitud de donde se conecta`
    },

    "lon": {
      type: 'Number',
      defaultsTo: 0,
      description: `Longitud de donde se conecta`
    },

    "org": {
      type: 'String',
      defaultsTo: '',
      description: `Organización de donde esta la ip`
    },

    "region": {
      type: 'String',
      defaultsTo: '',
      description: `Region`
    },

    "regionName": {
      type: 'String',
      defaultsTo: '',
      description: `Region de conexion de la IPS`
    },

    "status": {
      type: 'String',
      defaultsTo: '',
      description: `Estado de conexion de la ip`
    },

    "timezone": {
      type: 'String',
      defaultsTo: '',
      description: `Zona horaria`
    },

    "zip": {
      type: 'String',
      defaultsTo: '',
      description: `Codigo Zip de conexion`
    },
    
    'blocked': {
      type: 'String',
      isIn: ['L','U'],
      defaultsTo: 'U',
      description: `Se determina si la ip sera bloqueada o no, esta por defecto
        en unblocked`
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    // Conexion con logs Navigations
    logsNav: {
      collection: 'logsnavigations',
      via: 'ipsl'
    }
  },

};

/**
 Example
 {
   "as": "AS14080 Telmex Colombia S.A.",
   "city": "Bogotá (Chapinero)",
   "country": "Colombia",
   "countryCode": "CO",
   "isp": "Telmex Colombia S.A.",
   "lat": 4.64816,
   "lon": -74.0594,
   "org": "Telmex Colombia S.A.",
   "query": "181.48.247.241",
   "region": "",
   "regionName": "Bogota D.C.",
   "status": "success",
   "timezone": "America/Bogota",
   "zip": "110221"
 }
 */


