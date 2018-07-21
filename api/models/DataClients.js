/**
 * DataClients.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    // Id desde Facebook
    'idfbs': {
      type: 'string',
      unique: true,
      defaultsTo: ''
    },

    // nombre:
    "first_name": {
      type: 'string',
      defaultsTo: '',
      description: 'Nombre o nombres de las personas',
    },
    
    // Apellidos
    "last_name": {
      type: 'string',
      defaultsTo: '',
      description: 'Apellido o apellidos de las personas',
    },
    
    // imagen
    "profile_pic": {
      type: 'string',
      defaultsTo: '',
      description: 'Imagen de la persona',
    },
    
    // Localización en el Idioma
    "locale": {
      type: 'string',
      defaultsTo: 'es_LA',
      description: 'El idioma desde donde me esta hablando la persona',
    },
    
    // Zona Horaria de la persona
    "timezone": {
      type: 'number',
      defaultsTo: 0,
      description: 'Zona horaria de la persona',
    },
    
    // Si es mujer o hombre
    "gender": {
      type: 'string',
      defaultsTo: 'none',
      description: 'Genero Sexual de la persona',
    },

    // Activa la personas
    'active': {
      type: 'boolean',
      defaultsTo: true,
      description: 'El usuario esta activo.',
    },

    /**
     * 0 = update auto
     * 1 = update manual
     * 2 = update 
     */
    'dataUpdate': {
      type: 'number',
      isIn: [0,1,2],
      defaultsTo: 0,
      description: `Identificacra los perfiles de las personas con las que nos comunicamos
        Guardara los datos y los actualizara para la verificación de estos.
        tambien mantendra la base de datos actualizada en caso tal de que estos no coincidan.
        NOTA:
        Esto es vasado en los perfiles de facebook y se podran cambiar o actualizar de manera 
        automatica o manual
        en la manera manual se podran poner el nombre aunque este cambien el perfil de la persona
        en automatico, cada vez que no coincida con el se cambiara sin ningun previo aviso
        Defaults Automatico`
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    
    
    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    
    // Id de conexion
    // 'idsfbs': {
    //   model: 'clientsid'
    // },

  }

};

