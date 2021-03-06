/**
 * IpGeos.js
 *
 * @description :: Guarda todas las Ip's ya generadas y registradas para cada pais
 *    Permitiendo averiguar de donde se conectan cada huespect y de donde procede 
 *    cada petición de mi servidor
 * 
 *    A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 * @author :: SaulNavarrov <Sinavarrov@gmail.com>
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
      description: `Para bloquear paises que llegen a conflictos
        B = Ip Bloqueada
        U = Ip Desbloqueada
        
        Hacer funcion para bloquear ips automaticamente, esta es una segundaria despues de
        revisar los paises bloqueados`
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

