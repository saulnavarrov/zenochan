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
    idClient: {
      type: 'string',
      defaultsTo: '',
      description: 'Id del usuario que envia el mensaje a la pagina',
    },

    idPage: {
      type: 'string',
      defaultsTo: '',
      description: `Id de la pagina con la que se comunica el usuario`
    },

    times: {
      type: 'number',
      defaultsTo: 0,
      description: `Fecha y hora en que llega el mensaje
        Tambien se usa para darle lectuara a un mensaje`
    },

    tm: {
      type: 'string',
      defaultsTo: 'message',
      description: `Tipo de mensaje que llega
        Este dira que tipo de mensaje es el que se aplica debido a su contenido
        actualmente existen 3 tipos de mensajes:
        delivery: Mensajes enviados desde el servidor o confiramcion de que se 
            envio un mensaje por el bot
        read: Mensaje de lectura del chat
        message: Contenido o cuerpo con el cual se trabajan todos los datos`
    },

    seq: {
      type: 'number',
      defaultsTo: 0,
      description: `Numero de secuencia
        del mensaje que llega, este numero lo genera facebook y va adjunto en cada
        mensaje que recivimos.
        Solo para Read y Delivery viene en 0`
    },

    typ: {
      type: 'string',
      defaultsTo: 'text',
      description: `Determina el mensaje que viene de parte del cliente
        y el que se le enviara para respuesta
        Esto permitira el control de los mensajes para su procesamiento final`
    },

    tym: {
      type: 'boolean',
      defaultsTo: false,
      description: `Este valor determina si el contenido
        contiene mensaje en caractere de datos`,
    },

    txt: {
      type: 'string',
      defaultsTo: '',
      description: `Contenido en texto que viene por parte del servidor o el
        sea para entregar un mensaje por parte del bot o entrad del mensaje`
    },
    
    txa: {
      type: 'json',
      defaultsTo: {},
      description: `Array del mensaje que viene por parte del usuario y las respuesta
        que es posible que se le de`
    },

    aty: {
      type: 'boolean',
      defaultsTo: false,
      description: `Verificación de que el mensaje contiene
        adjuntos aparte del texto como se ven las urls,
        con este se determina si contiene el adjunto de las imagenes,
        stikers, entre otras mas`
    },

    att: {
      type: 'json',
      defaultsTo: {},
      description: `contiene todo el contenido del adjunto en formato JSON
        para trabajarlo desde lado del cliente`
    },

    mid: {
      type: 'string',
      defaultsTo: '',
      description: `Id del mensaje de entrada o de salida que entrega el servidor de
        facebook para identificar y evitar la duplicacion de datos`
    },

    sti: {
      type: 'number',
      defaultsTo: 0,
      description: `Identificación del stiker
        Este es un numero que viene en `
    },

    uri: {
      type: 'string',
      defaultsTo: '',
      description: `Url de los archivos adjuntos`
    },

    mes: {
      type: 'json',
      defaultsTo: {},
      description: `Conjunto de datos completo de JSON`
    },

    bod: {
      type: 'json',
      defaultsTo: {},
      description: `Conjunto de datos completo del mensaje sin modificaciones`
    },

    // 
    read: {
      type: 'number',
      isIn: [0,1,2,3],
      description: 'Si el mensaje se ha leido'
    },

    // Si el mensaje fue enviado o recivido
    // 'sb', = Enviado desde el Book
    // 'tR', = Mensaje ingesado
    // 're', = Lectura desde el bot
    // 'rF', = Respuesta desde Facebook
    sendRead: {
      type: 'string',
      defaultsTo: 'tR',
      isIn: ['sb', 'tR', 're', 'rF'],
      description: 'Si el mensaje fue enviado o recivido'
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    // idClient: {
    //   type: 'string',
    //   // collection: ''
    //   defaultsTo: '',
    //   description: 'id del cliente a quien responderle'
    // },

    // // 
    // idPage: {
    //   type: 'string',
    //   defaultsTo: '',
    //   description: 'id de la pagina que se utiliza'
    // },

  },

};