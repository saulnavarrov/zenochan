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

    'activeBot': {
      type: 'string',
      isIn: ['a', 'i', 't1', 't7', 't15', 't30'],
      defaultsTo: 'a',
      description: `Permitira activar o desactivar el Bot para una persona, Si
      esta opcion se encuentra desctivada, el bot no respondera nada a la persona 
      y debera esperar a que un usuario administrador o que meneje la pagina, le responda
      esta enviara un mensaje al admin para que esta pueda ser respondida lo mas antes posible
      a: Activo siempre para respuestas
      i: Inactivo: hasta que el admin envie el comando de activación
      t1: Inactive Temporalmente 1 dia
      t7: Inactive Temporalmente 7 dia 
      t15: Inactive Temporalmente 15 dia
      t30: Inactive Temporalmente 30 dia `
    },

    roles: {
      type: 'String',
      isIn: ['a','c','r','u'],
      defaultsTo: 'u',
      description: `Es necesario el rol de estas paginas ya que cuando se require enviar mensajes
      de alerta de algun error estos deben ser notificados al admininistrador o personal encargado
      tendra como default u
      a: Administradores
      c: Comunicadores
      r: Root Dueños de la pagina
      u: Usuarios Comunes y Corrientes
      `
    },

    'dataUpdate': {
      type: 'string',
      isIn: ['a','b','c','d'],
      defaultsTo: 'b',
      description: `Identificacra los perfiles de las personas con las que nos comunicamos
        Guardara los datos y los actualizara para la verificación de estos.
        tambien mantendra la base de datos actualizada en caso tal de que estos no coincidan.
        NOTA:
        Esto es vasado en los perfiles de facebook y se podran cambiar o actualizar de manera 
        automatica o manual
        en la manera manual se podran poner el nombre aunque este cambien el perfil de la persona
        en automatico, cada vez que no coincida con el se cambiara sin ningun previo aviso
        a: Create New Clients User (no usar)
        b: Actualizaciones Automaticas del Usuario
        c: Actualizaciones Manuales
        d: Actualizaciones Desactivadas
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

