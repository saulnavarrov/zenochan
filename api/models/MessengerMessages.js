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
      defaultsTo: 'page',
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
      isIn: [0,1,2,3],
      description: 'Si el mensaje se ha leido'
    },

    // Si el mensaje fue enviado o recivido
    // 'submit', = Enviado desde el Book
    // 'toReceibe', = Mensaje ingesado
    // 'reads', = Lectura desde el bot
    // 'resFB', = Respuesta desde Facebook
    // 'sendFB', = Enviado desde Facebook
    sendread: {
      type: 'string',
      isIn: ['submit', 'toReceibe', 'reads', 'resFB', 'sendFB'],
      description: 'Si el mensaje fue enviado o recivido'
    },

    timestamp: {
      type: 'number',
      description: 'La hora en que llega el mensaje, sirve para identificar el mensaje saber cual darle read'
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


/**
 * 
 * // Mensaje para eduardo
 {
   "object": "page",
   "entry": [{
     "id": "1467462703307477",
     "time": 1531585403491,
     "messaging": [{
       "sender": {
         "id": "2186998384647446"
       },
       "recipient": {
         "id": "1467462703307477"
       },
       "timestamp": 1531583554948,
       "message": {
         "mid": "Pxv1otsbU1MFOFiXWQ2PpVm9kMljBAIXfWscbQpz_4qi9RaekLg_k7Qy_8DRwWbQD9lSQ-3fq8jXGYlSWWtkCg",
         "seq": 278088,
         "text": "hola que mas pues"
       }
     }]
   }]
 }

 *
 * // Mensaje para saul
 {
   "object": "page",
   "entry": [{
     "id": "1467462703307477",
     "time": 1531585647981,
     "messaging": [{
       "sender": {
         "id": "2186998384647446"
       },
       "recipient": {
         "id": "1467462703307477"
       },
       "timestamp": 1531583554948,
       "message": {
         "mid": "Pxv1otsbU1MFOFiXWQ2PpVm9kMljBAIXfWscbQpz_4qi9RaekLg_k7Qy_8DRwWbQD9lSQ-3fq8jXGYlSWWtkCg",
         "seq": 278088,
         "text": "hola que mas pues"
       }
     }]
   }]
 }
 */

// var mensajeRead = {
//    "object": "page",
//    "entry": [{
//      "id": "2083506518327974",
//      "time": 1531614758062,
//      "standby": [{
//        "sender": {
//          "id": "1703497029718211"
//        },
//        "recipient": {
//          "id": "2083506518327974"
//        },
//        "timestamp": 1531614758047,
//        "read": {
//          "watermark": 1531614733308,
//          "seq": 0
//        }
//      }]
//    }]
//  }

// var times = {
//   "object": "page",
//   "entry": [{
//     "id": "2083506518327974",
//     "time": 1531666183439,
//     "standby": [{
//       "sender": {
//         "id": "1703497029718211"
//       },
//       "recipient": {
//         "id": "2083506518327974"
//       },
//       "timestamp": 1531666183424,
//       "delivery": {
//         "watermark": 1531666182238,
//         "seq": 0
//       }
//     }]
//   }]
// }


// var esmin = {
//   "createdAt": "2018-07-15T15:29:36.218Z",
//   "updatedAt": "2018-07-15T15:29:36.218Z",
//   "id": "5b4b68602d237f0014d999eb",
//   "object": "page",
//   "sequence": 278386,
//   "typeMess": "text",
//   "text": true,
//   "textString": "quiero una entrada gratis jajajaja",
//   "textArray": ["quiero", "una", "entrada", "gratis", "jajajaja"],
//   "stikerId": 0,
//   "attachments": {},
//   "read": 0,
//   "sendread": "toReceibe",
//   "timestamp": 1531668575867,
//   "messageComplete": {
//     "object": "page",
//     "entry": [{
//       "id": "2083506518327974",
//       "time": 1531668576021,
//       "standby": [{
//         "sender": {
//           "id": "1703497029718211"
//         },
//         "recipient": {
//           "id": "2083506518327974"
//         },
//         "timestamp": 1531668575867,
//         "message": {
//           "mid": "_jtelBuzU0azDlNDkHnDmD2OGniNCp17HMqEXIaaKk6msyDuvxnzJ93JKoW6gBM3glXl3bQLhJrOeIHaZRlHZg",
//           "seq": 278386,
//           "text": "quiero una entrada gratis jajajaja"
//         }
//       }]
//     }]
//   },
//   "idClient": "1703497029718211",
//   "idPage": "2083506518327974"
// }

// var enFb = {
//   "object": "page",
//   "entry": [{
//     "id": "2083506518327974",
//     "time": 1531668593739,
//     "standby": [{
//       "sender": {
//         "id": "1703497029718211"
//       },
//       "recipient": {
//         "id": "2083506518327974"
//       },
//       "timestamp": 1531668593710,
//       "delivery": {
//         "mids": ["oQNg0m0FQUIB714ClpdXzj2OGniNCp17HMqEXIaaKk6OjsK3wBcOet3h2QSbiJcvdyF3_p9A77CxshGTfl3QGA"],
//         "watermark": 1531668593430,
//         "seq": 0
//       }
//     }]
//   }]
// }

// var enfb2 = {
//   "object": "page",
//   "entry": [{
//     "id": "2083506518327974",
//     "time": 1531668593969,
//     "standby": [{
//       "sender": {
//         "id": "1703497029718211"
//       },
//       "recipient": {
//         "id": "2083506518327974"
//       },
//       "timestamp": 1531668593940,
//       "delivery": {
//         "mids": ["oQNg0m0FQUIB714ClpdXzj2OGniNCp17HMqEXIaaKk6OjsK3wBcOet3h2QSbiJcvdyF3_p9A77CxshGTfl3QGA"],
//         "watermark": 1531668593430,
//         "seq": 0
//       }
//     }]
//   }]
// }