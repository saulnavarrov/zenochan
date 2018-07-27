/**
 * WebhooksController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
// conector
const { MessengerClient } = require('messaging-api-messenger');
// variables
// Token que genera facebook app para la pagina
const token_apiSaul = 'EAAFPdRVJsDoBAClzsa0N0RqrFCYqpcLdDKFNPn2XtTAoDYLwhZCocKO0ZBchlNpZC3CNr1DZA8cWYWhA4RjsYIpJPWHmhNjFxAq166I6ZCP1XRFob6HcJ6C95JWBjX51F69tRUOZBvtcX07Wa8bshrLSryaP0jT6x3JxHdV5yvU9p56UMOrAvW';
// Token de la app para que facebook la reconosca
const apptoken = 'Sails=3AUVG-R9ZyY85-uFdoYEU0m6xNKz2wV1lV.N0kXRlGwXdFMVuBH0U9bFEvRBya%2BMJWdnkFzNU%2B%2FFIU=Saul';

// Conexion con facebook
const client = MessengerClient;

// Guarda de manera temporal la identificación de la personas
var profileDataClients = {};

// Guarda el token de manera global para que pueda ser usado mas luego.
var dataPageConnectGlobal = {};


/************************************************************************************************
 * getConfirmtWebHooks
 * @description :: Configuración para verificar que facebook se puede conectar con la api del sistema.
 * @param {json} opt 
 * @param {callback} cb Devolución de la llamada 
 ***********************************************************************************************/

var getConfirmtWebHooks = (opt, cb) => {
  console.log('Iniciando Fn getConfirmtWebHooks');

  // Variables
  var mode = suscription = opt.mode || false; // Suscriptions
  var challenge = opt.challenge || false; // Code Return to Facebook WebHooks
  var verify = opt.verify || false; // Token que envia Facebook para confirmar
  var token = opt.token || false; // Token que envias
  const verifyTokenMatches = (verify === token); // Confirmación de la comparación de token si coinciden


  // Rechazo por no tener el mode
  if (!mode) {
    return cb(true, {
      error: true,
      title: 'Error Suscription',
      message: 'No se encontro el Texto de Suscriptions Mode',
      solution: 'opt.mode: "variable de suscripción"'
    });
  }
  // Rechazo por no tener el codigo de facebook
  else if (!challenge) {
    return cb(true, {
      error: true,
      title: 'Error Codigo Facebook',
      message: 'No se encontro el Codigo de retorno de facebook',
      solution: 'opt.challenge: "Codigo" > Codigo Facebook'
    });
  }
  // Rechazo por no tener el token
  else if (!token) {
    return cb(true, {
      error: true,
      title: 'No hay token App WebHooks',
      message: 'No se encontro el token de verificacion que generastes para comparar con Facebook',
      solution: 'opt.token: "Codigo" > token que tu generas'
    });
  }
  // Rechazo del token que envia facebook para rectificar el envio
  else if (!verify) {
    return cb(true, {
      error: true,
      title: 'No hay token facebook para App WebHooks',
      message: 'No se encontro el token que pusiste en facebook',
      solution: 'Agregar token secreto en facebook'
    });
  } else {

    // Compruebo que sea una suscripcion
    if (suscription && verifyTokenMatches) {
      return cb(false, {
        code: true,
        codigo: Number(challenge)
      });
      // res.json(Number(challenge));
    } else {
      // No coinciden 
      return cb(true, {
        error: 'No coincide el codigo token',
        redirec: 'forbidden'
      });
    }
  }
}


/**
 * saveResponseMessageOut
 * @description :: Cuando se responde un mensaje este va cargado de una serie de contextos
 *    y que a su vez funcionan como cuando lo envias desde facebook
 *    Gracias al Paquete de NPM 'messaging-api-messenger', esto es solucionado de una manera
 *    mucho mas efectiva donde, nos ahorramos mucho codigo para el envio de datos, el detalle
 *    es que esto al momento de guardarlos y luego visualizarlo en la base de datos o en la pagina
 *    para obtener un control de lo que se envia (Llevar un registro doble, tanto en facebook como 
 *    en el sistema), no deja guardarlos.
 * 
 * @param {json} opt :: Contenido y cuerpo del mensaje que desea enviar
 * @param {string} type :: Tipo de mensaje que desea enviar
 * @author :: SaulNavarrov <sinavarrov@gmail.com>
 */
var saveResponseMessageOut = async (opt, type) => {
  sails.log.debug('= =======================================> Funcion save response message out');
  
  // Guardar los de tipo Texto
  if(type === 'text'){

    // Data de lo que se va a guardar
    var saveData = {
      idClient: opt.idClient,
      idPage: opt.idPage,
      times: 0,
      tm: 'ZenBot',
      seq: 0,
      typ: 'text',
      tym: true,
      txt: opt.text,
      txa: opt.text.split(' '),
      aty: false,
      att: {},
      mid: 'SendMessageBotReemplace',
      sti: 0,
      uri: '',
      mes: {},
      bod: {},
      read: 0,
      sendRead: 'sb'
    }
  
    var saveMensajeResponseBot = await MessengerMessages.create(saveData).fetch();

    // Respuesta del cliente.
    client.connect(dataPageConnectGlobal.tokenPage).sendMessage(String(opt.idClient), {
      text: `${opt.text}`,
    });
  }
}

/**
 *{
   "_id": ObjectId("5b5a38bd399c1000140c5a8a"),
   "idClient": "1703497029718211",
   "idPage": "2083506518327974",
   "times": 1532639421689.0,
   "tm": "message",
   "seq": NumberInt(282017),
   "typ": "text",
   "tym": true,
   "txt": "PPP ppp",
   "txa": [
     "PPP",
     "ppp"
   ],
   "aty": false,
   "att": false,
   "mid": "kR6EpVKdOstKyqhEEWvXmj2OGniNCp17HMqEXIaaKk4rlteIDcvrd9HgHXjH-vmSqvqZMpeihnHDejdDUTMZuw",
   "sti": NumberInt(0),
   "uri": "",
   "mes": {
     "mid": "kR6EpVKdOstKyqhEEWvXmj2OGniNCp17HMqEXIaaKk4rlteIDcvrd9HgHXjH-vmSqvqZMpeihnHDejdDUTMZuw",
     "seq": NumberInt(282017),
     "text": "PPP ppp"
   },
   "bod": {
     "object": "page",
     "entry": [{
       "id": "2083506518327974",
       "time": 1532639421812.0,
       "standby": [{
         "sender": {
           "id": "1703497029718211"
         },
         "recipient": {
           "id": "2083506518327974"
         },
         "timestamp": 1532639421689.0,
         "message": {
           "mid": "kR6EpVKdOstKyqhEEWvXmj2OGniNCp17HMqEXIaaKk4rlteIDcvrd9HgHXjH-vmSqvqZMpeihnHDejdDUTMZuw",
           "seq": NumberInt(282017),
           "text": "PPP ppp"
         }
       }]
     }]
   },
   "read": NumberInt(0),
   "sendRead": "tR"
 }
 */




/****************************************************************************
 * 
 * SaveMessageIn
 * @function
 * @description :: Guardara todos los mensajes que entrano salend del sistema
 * 
 ****************************************************************************/
var SaveMessageIn = async (opt) => {
  sails.log.debug('= =======================================> Funcion SaveMensaje In');

  // Estructura del mensaje
  var saveData = opt;

  // Guarda el mensaje
  var saveMessengerMessages = await MessengerMessages.create(saveData).fetch();
  // console.log('= =======================================> Start Save Ms In');
  // console.log(JSON.stringify(saveMessengerMessages));
  // console.log('= =======================================> Stop');

  // Envio para filtros del mensaje y saber el contenido que se esta pidiendo.
  // ya sea del ultimo en revision.
  FilterDataMessageIn(saveData);
}


/****************************************************************************
 *
 * FilterDataMessageIn
 * @description :: Filtrara que tipo de mensajes se enviaran al Autor 
 * debido a que todos estos no pueden ser procesados por su tipo de complejidad
 * como ejemplo los de son diferentes a los de tipo de textos.
 * @param {array} opt 
 * @author :: SaulNavarrov <Sinavarrov@gmail.com>
 */
var FilterDataMessageIn = async (opt) => {
  sails.log.debug('= =======================================> Funcion Filter Data Message');
  var type = opt.typ || null;

  // filtros para textos
  if(type === 'text'){
    // Funcion para buscar los datos en la base si existen o no.
    // Respuestas Rapida de resolución
    var texto = `Resp: ${opt.txt}`;

    // Funcion de respuestas
    saveResponseMessageOut({
      idClient: opt.idClient,
      idPage: opt.idPage,
      text: texto,
    }, 'text');
    
    // SaveMessageOut(opt, body)

    // Funcion para controlar las palabras
    // ContadorDePalabrasYCorreccion(opt, body);
  }

  //Contenido no procesado
  else{
    // Respuesta para el cliente que manda el mensaje
    if(opt.seq > 0){
      setTimeout(() => {
        var texto = `Hola ${profileDataClients.first_name} ${profileDataClients.last_name}\nLo siento no soportamos este tipo de mensajes!`;

        saveResponseMessageOut({
          idClient: opt.idClient,
          idPage: opt.idPage,
          text: texto
        },'text');
        // client.sendMessage(String(opt.idClient), {
        //   text: `Hola ${profileDataClients.first_name} ${profileDataClients.last_name}\nLo siento no soportamos este tipo de mensajes!`,
        // });
      }, 333);
    }
  }
}




/****************************************************************************
 *
 * ContadorDePalabras
 * @description :: Contara las palabras y actualizara su contador, a su vez respondera que
 *    palabras no exiten en la base de datos y la restaurara.
 * @param {array} opt :: Array de datos de ingresos
 * @param {callback} cb Debolución del contenido para el contador del sistema 
 * @author :: SaulNavarrov <Sinavarrov@gmail.com>
 *
 *****************************************************************************/
// var ContadorDePalabrasYCorreccion = async function (opt, body, cb) {

//   console.log('controlador de palabras')
//   // return cb(false, false);
// }






/***************************************************************************
 * 
 * SaveMessageOut
 * @description :: Guarda el mensaje de ingresos de facebook de ingresos
 * @param {array} opt 
 * @param {array} body  
 * 
 ****************************************************************************/
// var SaveMessageOut =  async function (opt, body){
//   sails.log.debug('Funcion SaveMensaje out')

//   // Estructura del mensaje
//   var saveData = {
//     object: opt.ob,
//     sequence: opt.seq || 0,
//     typeMess: 'text',
//     text: opt.txt,
//     textString: opt.text,
//     textArray: !opt.txt ? [] : opt.text.split(' '),
//     stikerId: opt.stiker,
//     attachments: opt.attachments,
//     idClient: opt.idClient,
//     idPage: opt.idPage,
//     sendread: 'submit',
//     messageComplete: body,
//     timestamp: opt.times,
//     read: 1
//   }

//   // await MessengerMessages.create(saveData).fetch();

//   // resolver el problema del doble submit debido

//   // console.log('= =======================================> Start save Out');
//   // console.log(saveData)
//   // console.log(' = = = = = > Body')
//   // console.log(JSON.stringify(body));
//   // console.log('= =======================================> Stop');
//   // return cb(false, false);
// }




/****************************************************************************
 * 
 * SaveReadMessage
 * @description :: Guarda el estado de Lectura.
 * @param {array} opt 
 * @param {array} body 
 * 
 ****************************************************************************/
// var SaveReadMessage = async function (opt, s, body) {
//   sails.log.debug('Funcion SaveMensaje Read');

//   // Estructura del mensaje
//   var saveData = {
//     object: s.ob,
//     sequence: s.seq,
//     typeMess: 'SendMessReadsFB',
//     text: s.txt,
//     textString: s.text,
//     textArray: !opt.txt ? [] : s.text.split(' '),
//     stikerId: s.stiker,
//     attachments: s.attachments,
//     idClient: s.idClient,
//     idPage: s.idPage,
//     sendread: 'resFB',
//     messageComplete: body,
//     timestamp: s.times,
//     read: 1
//   }

//   // Busca el Mensaje con el tiempo donde fue guardado.
//   var reads = await MessengerMessages
//     .find({
//       'timestamp': opt.watermark
//     })
//     .catch(err => {
//       reads = false;
//       console.log(err)
//     });
    
//     // console.log('= = = = = ==============> Error > ',reads.length)

//   // Actualiza el Mensaje que se ha Leido como tal.
//   if (reads.length) {
//     var readMes = typeof (reads) === 'undefined' ? 1 : reads[0].read;
//     // console.log('= = = = = ==============> ', readMes)
//     var readUpdate = await MessengerMessages
//       .update({
//         'timestamp': opt.watermark
//       })
//       .set({
//         read: readMes + 1 ,
//       })
//       .fetch();
//   }else{
//     readUpdate = {
//       error: true,
//       message: 'No se encontro el mensaje que se va actualizar la lectura o es un mensaje enviado desde facebook'
//     }
//   }

//   // Guarda el Mensaje de Lectura en el sistema.
//   await MessengerMessages.create(saveData).fetch();
// }






/****************************************************************************
 *
 * IdentificacionDePerfiles
 * @description :: Identificacra los perfiles de las personas con las que nos comunicamos
 * Guardara los datos y los actualizara para la verificación de estos.
 * tambien mantendra la base de datos actualizada en caso tal de que estos no coincidan.
 * NOTA:
 * Esto es vasado en los perfiles de facebook y se podran cambiar o actualizar de manera 
 * automatica o manual
 * en la manera manual se podran poner el nombre aunque este cambien el perfil de la persona
 * en automatico, cada vez que no coincida con el se cambiara sin ningun previo aviso
 * Defaults Automatico
 * @param {string} idfb :: Codigo para identificar el Cliente de facebook
 * @author :: SaulNavarrov <Sinavarrov@gmail.com>
 */
var IdentificacionDePerfiles = async idFb => {
  sails.log.debug('Function: IdentificacionDePerfiles()');

  // Busqueda del usuario cliente en la base de datos
  var clientsDataId = await DataClients.find({
      "idfbs": String(idFb)
    })
    .catch(err => {
      return {
        success: false,
        message: 'Cliente no Encontrado',
        error: err
      }
    });

    // Verificación de contenido de usuario en caso de no exista este lo genera automaticamente
    if (clientsDataId.length > 0) {
      // Actualiza los datos del usuario en la variable global
      profileDataClients = clientsDataId[0];
      
      // Actualizaciones de datos
      GetDataUserProfileFb(idFb, profileDataClients.dataUpdate);
    }
    else{
      // Ejecutara la funcion adecuada para la busqueda de los datos de los usuarios.
      // Accion de crear nuevo usuarios
      GetDataUserProfileFb(idFb, 'a');
    }
}



/****************************************************************************************
 * GetDataUserProfileFb
 * @description :: Buscara los datos en facebook y los traera de vuelta para poder
 *    ser creados o a su vez actualizado de manera automaticamente o manual
 * @param {string} idfb :: ID del usuario que viene de facebook
 * @param {string} act :: Accion que va tomar la funcion luego despues de encontrar el usuario 
 *    y entregarla posteriormente a otro usuario
 * @author :: SaulNavarrov <Sinavarrov@gmail.com>
 */
var GetDataUserProfileFb = async (idfb, act) => {
  
  // Traera del facebook los datos del usuario
  client.connect(dataPageConnectGlobal.tokenPage).getUserProfile(String(idfb))
    .then(user => {
      if (user) {
        // Llamando la funcion y pasando la correspondiente variable.
        CreateUpdateUsersClints(user, act);
      }
    });
}



/****************************************************************************************
 * CreateUpdateUsersClints
 * @description :: Craara los nuevos usuarios, tambien dara la accion para actualizarlos y
 *    contara con la funcion para actualizarlos de manera manual.
 *    si el usuario esta desactivado, debera responder con un mensaje de alerta.
 * @param {string} idfb :: ID del usuario que viene de facebook
 * @param {string} act :: Accion que va tomar la funcion luego despues de encontrar el usuario 
 *    y entregarla posteriormente a otro usuario
 * @author :: SaulNavarrov <Sinavarrov@gmail.com> 
 */
var CreateUpdateUsersClints = async (user, act) => {

  // Creación de un usuario nuevo.
  if(act === 'a'){
    if(user){
      var newClienteData = await DataClients.create({
            idfbs: String(user.id),
            first_name: user.first_name,
            last_name: user.last_name,
            profile_pic: user.profile_pic,
            locale: user.locale,
            timezone: user.timezone,
            gender: user.gender,
            active: 'true',
          })
          .fetch();
      // Actualiza los datos del usuario en la variable global
      profileDataClients = newClienteData;
    }
  }

  // Actualización Automatica de los usuarios
  if(act === 'b'){
    if(user){
      await DataClients.update({
        "idfbs": String(user.id)
        })
        .set({
          first_name: user.first_name,
          last_name: user.last_name,
          profile_pic: user.profile_pic,
          locale: user.locale,
          timezone: user.timezone,
          gender: user.gender,
        });
    }
  }

  // Actualización Manual por parte de los admins0
  if (act === 'c') {
    if (use) {
      await DataClients.update({
          "idfbs": String(user.id)
        })
        .set({
          first_name: user.first_name,
          last_name: user.last_name,
          profile_pic: user.profile_pic,
          locale: user.locale,
          timezone: user.timezone,
          gender: user.gender,
        });
    }
  }
  
  // Actualizaciones desactivadas se activan par
  if (act === 'd') {
    
    /**
     * AQUI LAS ACTUALIZACIONES DEBEN CAMBIAR, Y SI NO DEBE ENVIAR UNA ALVERTENCIA DE QUE LAS ACTUALIZACIONES
     * ESTAN DESACTIVADAS PARA ESTE USUARIO.
     */
  }
}


/**
 * getDataPage
 * @description :: 
 * @param {array} opt :: array de datos
 * @author :: SaulNavarrov < Sinavarrov @gmail.com >
 */
var getDataPage = async (opt) => {
  var idPage = opt.idPage;

  var getDataPageDb = await DataPages.find({
    idPage: idPage
  });

  dataPageConnectGlobal = getDataPageDb[0];

  console.log(getDataPageDb);
  // console.log(opt);

}






/************************************************************************
 * modulos
 */
module.exports = {
  
  /**
   * getWebHooks
   * @description :: Conexion con la facebook desde Facebook 
   */
  'getWebHooks': (req, res)=>{

    var body = req.query || 0;
    var opciones = {
      mode: req.query['hub.mode'] || false,
      challenge: req.query['hub.challenge'] || false,
      verify: req.query['hub.verify_token'] || false,
      token: apptoken
    }

    // Impresion de la consola sobre lo que manda Facebook para conectarse con mi App
    // console.log(JSON.stringify(body));

    // Verificara que el body venga cargado desde facebook si no es asi no pasara a confirmaciones
    if (!body) {
      return res.forbidden();
    } else {
      // Confirmara el sistema
      // Enviar estos datos a la pantalla mas adelante
      getConfirmtWebHooks(opciones, (err, ok) => {
        // Error No coincide los tokens resulve en devolver un status 400
        if (err) {
          // console.log(ok);
          return res.forbidden();
        } else {
          // Reenvia el codigo para orgnizarlos
          // console.log(ok)
          return res.json(Number(ok.codigo));
        }
      });
    }
  },



  /****************************************************************************
   * 
   * postWebHooksIn
   * @description::Mensajes de entrada que vienen desde facebook via POST
   *      para organizarlo desde la manera estructurada
   * 
   ****************************************************************************/
  'postWebHooksIn': (req, res) => {
      // variable Principal del sistema
      var body = b = req.body || 0;
      var ss = {};                // Contenido enviado desglosado
      // var b = body;
      var ob = ss.ob = b.object;  // Objeto de todo (page, personal)
      var en = b.entry[0];        // Contenido de Entry

      // Si tiene datos el Entry
      if(en){

        // Identificación de objetivo que envia el mensaje
        if (ob === 'page') {
          // Control de datos
          // * * * **********************************************************************
          // en.messaging[0];
          var em = typeof (en.standby) === 'object' ? en.standby[0] : en.messaging[0];

          // Tipo de mensaje (Read, Messageclient, Messaging, Delivery)
          var tm = typeof (em.message) === 'object' ? 'message' : typeof (em.read) === 'object' ? 'read' : typeof (em.delivery) === 'object' ? 'delivery' : 'NN';

          // Sabe si contiene texto o no contiene texto
          var tym = tm === 'message' ? typeof (em[tm].text) === 'string' ? true : false : false;

          // Guarda el contenido de Texto
          var txt = tym ? em[tm].text : '';

          // Cadena de array
          var txa = tym ? em[tm].text.split(' ') : [];

          // Guarda la secuencia que viene de facebook
          var seq = tm === 'message' ? em[tm].seq : 0;

          // Sabe que contenido tiene el Attachments
          var aty = tm === 'message' ? typeof (em[tm].attachments) === 'object' ? true : false : false;

          // Contenido del Attachments (archivos adjuntos enviados por el usuario)
          var att = aty ? em[tm].attachments[0] : false;

          // Que tipo de contenido me envia el usuario (Texto, Imagen, Archivo, Stiker)
          var typ = tm !== 'message' ? tm : tym ? 'text' : aty ? att.type : false;

          // ID del mensaje que envia facebook al usuario o que envia el bot
          var mid = tm === 'read' ? '' : tm === 'delivery' ? typeof (em[tm].mids[0]) === 'object' ? em[tm].mids[0] : '' : em[tm].mid;

          // Identificación de Stikers
          var sti = typ === 'image' ? em[tm].sticker_id : 0;

          // Url de los documentos
          var uri = sti < 1 ? '' : att.payload.url;


          // ***************************
          // ss.em = em; // Entry
          ss.idClient = String(em.sender.id); // Id del cliente
          ss.idPage = String(em.recipient.id); // Id de la pagina
          ss.times = em.timestamp; // Hora y fecha en que entra el mensaje
          ss.tm = tm; // Tipo de mensaje que envia Facebook a mi Servidor, por ahora hay solo 4
          ss.seq = seq; // Numero de secuencia del mensaje enviado por el usuario
          ss.typ = typ; // Tipo de mensaje que envia el cliente. (Texto, Imagen, Stiker, localizacion, Documentos)
          ss.tym = tym; // Si el mensaje contiene texto o no
          ss.txt = txt; // Texto del mensaje
          ss.txa = txa; // Cadena de Array del texto de entrada para ser procesado
          ss.aty = aty; // Verificación de contenido adjunto
          ss.att = att; // contenido adjunto
          ss.mid = mid; // Id del mensaje enviado desde facebook y desde el bot
          ss.sti = sti; // Numero del Stiker
          ss.uri = uri; // Url del stiker
          ss.mes = tm === 'NN' ? false : delete em[tm]['attachments'] ? em[tm] : em[tm]; // Contenido en secuencia del mensaje
          ss.bod = b; // Cuerpo completo del mensaje de entrada


          // Identificacion de los perfiles clientes
          if (seq > 0){
            IdentificacionDePerfiles(ss.idClient);
          }

          // Identificación de la Pagina para traer los datos de la pagina la que va a responder
          //    el bot de manera automatica identificandola y respondiendo de manera correcta
          if (typeof (ss.idPage) === 'string' )
          {
            getDataPage({idPage: ss.idPage});
          }
          
          // pageto
          // Control del flujo de datos Read, Delivery, messagings
          // Flujo para Los Reads
          setInterval( () => {
            if(tm === 'read') {
              console.log("--------------------------------------------> ", tm);
              // console.log('Type: Read -> ', tm);
              // console.log(ss);

              // Devuelve al servidor de Facebook que el mensaje ha sido recivido
              //   y que ya puede enviar los demas mensajes
              return res.ok('EVENT_RECEIVED');
            }

            // Flujo para los Messages
            else if (tm === 'message') {
              console.log("--------------------------------------------> ", tm);
              console.log('Type: message -> ', tm);

              // Ejecutando función
              SaveMessageIn(ss);

              // Devuelve al servidor de Facebook que el mensaje ha sido recivido
              //   y que ya puede enviar los demas mensajes
              return res.ok('EVENT_RECEIVED');
            }

            // Flujo para los Deliverys
            else if (tm === 'delivery') {
              console.log("--------------------------------------------> ", tm);
              // console.log('Type: Dekuvery -> ', tm);
              // console.log(ss);

              // Devuelve al servidor de Facebook que el mensaje ha sido recivido
              //   y que ya puede enviar los demas mensajes
              return res.ok('EVENT_RECEIVED');
            }

            // No hay nada
            else {
              console.log("--------------------------------------------> ERROR:", tm);
              console.error('Que Paso');

              // Devuelve al servidor de Facebook que el mensaje ha sido recivido
              //   y que ya puede enviar los demas mensajes
              return res.ok('EVENT_RECEIVED');
            }

            // Salida 
            // console.log('-------------------------------------------->');
            // console.log(ss); 
            // console.log(JSON.stringify(body));

            // Devuelve al servidor de Facebook que el mensaje ha sido recivido
            //   y que ya puede enviar los demas mensajes
            return res.ok('EVENT_RECEIVED');
          }, 333);
        }
      }
      // Returns a '404 Not Found' if event is not from a page subscription
      else {
        return res.status(404);
      }



      
       // Mensajes enviados desde facebook
      // if(ob){
      // // Si tiene datos el Entry
      // if (en) {
        
        
      //   if (ob === 'page') {

      //     // identifica el usuario que envia el mensaje Si tiene usuario
      //     if(s.seq >= 1){
      //       IdentificacionDePerfiles(s.idClient);
      //     }

      //     // Guarda el mensaje dependiendo si viene o va el mensaje, e identifica si viene desde facebook
      //     //  o es una respuesta automatica
      //     console.log('= = = ================================================================> Controlador: ');
      //     console.log(JSON.stringify(body));
      //     console.log('= = = ================================================================> Controlador: ');

        
      //   // Retorno de ok para el sistema de facebook
      //   return res.ok('EVENT_RECEIVED');
      // }
      
      // Returns a '404 Not Found' if event is not from a page subscription
      // else {
      //   return res.status(404);
      // }
    },
};

