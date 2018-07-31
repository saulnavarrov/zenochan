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
  sails.log.debug('= =========== => Funcion save response message out');
  
  // Guardar los de tipo Texto
  if(type === 'text'){

    await ApiFbMessengerController.text('hola','como estas?',opt.token);

    // Data de lo que se va a guardar
    // var saveData = {
    //   idClient: opt.idClient,
    //   idPage: opt.idPage,
    //   times: 0,
    //   tm: 'ZenBot',
    //   seq: 0,
    //   typ: 'text',
    //   tym: true,
    //   txt: opt.text,
    //   txa: opt.text.split(' '),
    //   aty: false,
    //   att: {},
    //   mid: 'SendMessageBotReemplace',
    //   sti: 0,
    //   uri: '',
    //   mes: {},
    //   bod: {},
    //   read: 0,
    //   sendRead: 'sb'
    // }
  

    // var saveMensajeResponseBot = await MessengerMessages.create(saveData).fetch();

    // // Respuesta del cliente.
    // // if (typeof (opt.token) === 'string'){
    //   client.connect(opt.tokenPage).sendMessage(String(opt.idClient), {
    //     text: `${opt.text}`,
    //   });
    // }
  }

  else if(type === 'stiker'){
    // Data de lo que se van a Guardar
    var saveData = {

// ERROR:
//       trabajando bajo las imagenes
// para evitar el uso del paquete de npm
// messagin messenger


    }

    // var saveMensajeResponseBot = await MessengerMessages.create(saveData).fetch();

    // client.connect(opt.tokenPage).sendme 
  }
}




/****************************************************************************
 * 
 * SaveMessageIn
 * @function
 * @description :: Guardara todos los mensajes que entrano salend del sistema
 * 
 ****************************************************************************/
var SaveMessageIn = async (opt, tok) => {
  sails.log.debug('= =========== => Funcion SaveMensaje In');
  
  // Estructura del mensaje
  var saveData = opt;

  var findOrCreate = await MessengerMessages.find({
    idClient: String(saveData.idClient),
    idPage: String(saveData.idPage),
    seq: Number(saveData.seq),
    times: Number(saveData.times)
  });

  // 
  // console.log();
  if (findOrCreate.length === 0){

    // Guarda el mensaje
    await MessengerMessages.create(saveData).fetch();
  
    // Envio para filtros del mensaje y saber el contenido que se esta pidiendo.
    // ya sea del ultimo en revision.
    FilterDataMessageIn(opt, tok);
  }

}

// Error no esta llegando la variable del token para enviar los datos de regresos


/****************************************************************************
 *
 * FilterDataMessageIn
 * @description :: Filtrara que tipo de mensajes se enviaran al Autor 
 * debido a que todos estos no pueden ser procesados por su tipo de complejidad
 * como ejemplo los de son diferentes a los de tipo de textos.
 * @param {array} opt 
 * @author :: SaulNavarrov <Sinavarrov@gmail.com>
 */
var FilterDataMessageIn = async (opt, tok) => {
  sails.log.debug('= =========== => Funcion Filter Data Message');
  var type = opt.typ || null;
  // console.log(opt);

  // filtros para textos
  if(type === 'text'){
    // Funcion para buscar los datos en la base si existen o no.
    // Respuestas Rapida de resolución
    var texto = `Bot: ${opt.txt}`;



    // // Funcion de respuestas
    saveResponseMessageOut({
      idClient: opt.idClient,
      idPage: opt.idPage,
      tokenPage: tok,
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
        var texto = `Hola ${profileDataClients.first_name} ${profileDataClients.last_name}
        \nLo siento! aun no soportamos este tipo de mensajes!`;

        saveResponseMessageOut({
          idClient: opt.idClient,
          idPage: opt.idPage,
          tokenPage: tok,
          text: texto
        },'text');

        // saveResponseMessageOut({
        //   idClient: opt.idClient,
        //   idPage: opt.idPage,
        //   tokenPage: tok,
        //   text: '',
        //   sti: 369239383222810,
        //   uri: 'https://scontent.xx.fbcdn.net/v/t39.1997-6/p100x100/851582_369239386556143_1497813874_n.png?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=f662a5c4a3732dfa2ea2a6e8f7cc056f&oe=5C13604D'
        // },'stiker')
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

//   // console.log('= =============================> Start save Out');
//   // console.log(saveData)
//   // console.log(' = = = = = > Body')
//   // console.log(JSON.stringify(body));
//   // console.log('= =============================> Stop');
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
var IdentificacionDePerfiles = async (idFb, idPag, tok) => {
  sails.log.debug('= =========== => Funcion IdentificacionDePerfiles');

  // Busqueda del usuario cliente en la base de datos
  var clientsDataId = await DataClients.find({
      "idfbs": String(idFb),
    })
    .catch(err => {
      return {
        success: false,
        message: 'Cliente no Encontrado',
        error: err
      }
    });

  // Consulta de la pagina con la que se va a asociar
  // Elimino la información que no necesito
  var dp =  await DataPages.find({
    where: { idPage: String(idPag) },
    select: ['id', 'idPage']
    });
  var dataPages = dp[0];

  // Verificación de contenido de usuario en caso de no exista este lo genera automaticamente
  if (clientsDataId.length > 0) {
    // Actualiza los datos del usuario en la variable global
    profileDataClients = clientsDataId[0];
    
    // Actualizaciones de datos
    GetDataUserProfileFb(idFb, dataPages, tok, profileDataClients.dataUpdate);
  }
  else{
    // Ejecutara la funcion adecuada para la busqueda de los datos de los usuarios.
    // Accion de crear nuevo usuarios
    GetDataUserProfileFb(idFb, dataPages, tok, 'a');
  }
}


//                IMPORTANTE = IMPORTANTE = IMPORTANTE
// ASOCIAR LOS USUARIOS CON LAS PAGINAS CORRESPONDIENTES PARA NO GENERAR INCONVENIENTES
// A LA HORA DE ORGANIZARLOS POR PAGINAS Y CLIENTES

/****************************************************************************************
 * GetDataUserProfileFb
 * @description :: Buscara los datos en facebook y los traera de vuelta para poder
 *    ser creados o a su vez actualizado de manera automaticamente o manual
 * @param {string} idfb :: ID del usuario que viene de facebook
 * @param {string} idPag :: Id de la pagina con la que se busca y asocia la pagina
 * @param {string} act :: Accion que va tomar la funcion luego despues de encontrar el usuario 
 *    y entregarla posteriormente a otro usuario
 * @author :: SaulNavarrov <Sinavarrov@gmail.com>
 */
var GetDataUserProfileFb = async (idfb, dtPage, tok, act) => {
  sails.log.debug('= =========== => Funcion Get Data Use Profile FB');
  
  // Traera del facebook los datos del usuario
  await client.connect(tok).getUserProfile(String(idfb))
    .then(user => {
      if (user) {
        // Llamando la funcion y pasando la correspondiente variable.
        CreateUpdateUsersClints(user, dtPage, act);
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
var CreateUpdateUsersClints = async (user, dtPage, act) => {
  sails.log.debug('= =========== => Funcion Crete Update Users Clients');

  // Creación de un usuario nuevo.
  if(act === 'a'){
    if(user){
      var newClienteData = await DataClients.create({
            idfbs: String(user.id),
            idfbsPg: String(dtPage.idPage),
            first_name: user.first_name,
            last_name: user.last_name,
            profile_pic: user.profile_pic,
            locale: user.locale,
            timezone: user.timezone,
            gender: user.gender,
            active: 'true',
            idpages: dtPage.id
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
  sails.log.debug('= =========== => Funcion Get Data Page');

  var idPage = opt.idPage;

  var getDataPageDb = await DataPages.find({
    idPage: idPage
  });

  return getDataPageDb[0];
}



/**
 * updateToReadMessages
 * @description :: Se utilizara para la actualización de los mensajes en cuanto se lea un mensaje
 *    sea enviado desde el ZenoChan Bot o desde el servidor de Facebook, este encabezara y cambiara
 *    el contenido de la variable de 0 a 1, como lectura de los mensajes ya existentes.
 * @param {array} opt :: idClient and idPage para actualizar la lectura de datos por parte del boot
 *      y evitar una congestion de datos
 * @author :: SaulNavarrov <Sinavarrov@gmail.com>
 */
var updateToReadMessages = async (opt) => {
  sails.log.debug('= =========== => Funcion Update To Read Messages');

  var actualizando = await MessengerMessages.update({
      read: Number(0),
      idClient: String(opt.idClient),
      idPage: String(opt.idPage)
    })
    .set({
      read: Number(1)
    })
    .fetch();
}





/********************************************************************************
 *                      MODULE - EXPORTS = MODULE - EXPORTS
 ********************************************************************************/
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
  'postWebHooksIn': async (req, res) => {
      // variable Principal del sistema
      var body = b = req.body || 0;
      var ss = {};                // Contenido enviado desglosado
      // var b = body;
      var ob = ss.ob = b.object;  // Objeto de todo (page, personal)
      var en = b.entry[0];        // Contenido de Entry

      // Si tiene datos el Entry
      if(en){

        console.log('=====>>> Body Start')
        console.log(JSON.stringify(b));
        console.log('=====>>> Body End')

        // Identificación de objetivo que envia el mensaje
        if (ob === 'page') {
          // Control de datos
          // * * * **********************************************************************
          // * * * en.messaging[0];
          var em = typeof (en.standby) === 'object' ? en.standby[0] : en.messaging[0];

          // Tipo de mensaje (Read, Messageclient, Messaging, Delivery)
          var tm = typeof (em.message) === 'object' ? 'message' : typeof (em.read) === 'object' ? 'read' : typeof (em.delivery) === 'object' ? 'delivery' : typeof (em.postback) === 'object' ? 'postback' :'NN';

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
          var mid = tm === 'read' ? '' : tm === 'delivery' ? typeof (em[tm].mids) === 'object' ? em[tm].mids[0] : '' : em[tm].mid;

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

          
          // Identificación de la Pagina para traer los datos de la pagina la que va a responder
          //    el bot de manera automatica identificandola y respondiendo de manera correcta
          var dataPageGet = await getDataPage({idPage: ss.idPage});
              // ss.tokenPage = dataPageGet.tokenPage;

          
          // console.log(ss)
          
          // Verifiación de que la Pagina este Activa
          if(dataPageGet.active){

            // Control del flujo de datos Read, Delivery, messagings
            // ************************************************************************
            
            // Flujo para los Deliverys
            if ( tm === 'delivery' ) {
              console.log("--------------------------------------------> ", tm);
              // console.log('Type: Dekuvery -> ', tm);
              // console.log(ss);

              // Devuelve al servidor de Facebook que el mensaje ha sido recivido
              //   y que ya puede enviar los demas mensajes
              return res.ok('EVEN T_RECEIVED');
            }
            
            // Flujo para los Messages
            else if ( tm === 'message' ) {
              console.log("--------------------------------------------> ", tm);
              console.log('Type: message -> ', tm);
              
              // Identificacion de los perfiles clientes
              await IdentificacionDePerfiles(ss.idClient, ss.idPage, dataPageGet.tokenPage);
              
              // Ejecutando función
              await SaveMessageIn(ss, dataPageGet.tokenPage);
              
              //     // Devuelve al servidor de Facebook que el mensaje ha sido recivido
              //     //   y que ya puede enviar los demas mensajes
              return res.ok('EVENT_RECEIVED');
            }
            
            // Flujo para Los Reads
            else if( tm === 'read' ) {
              console.log("--------------------------------------------> ", tm);

              // Llama la funcion para actualizar los mensajes que aun esten en valor de 0 o
              //    o que aun no se han marcado como lecturas
              await updateToReadMessages({
                idClient: ss.idClient,
                idPage: ss.idPage
              });

              // Devuelve al servidor de Facebook que el mensaje ha sido recivido
              //   y que ya puede enviar los demas mensajes
              return res.ok('EVENT_RECEIVED');
            }

            // Flujo para los PostBack
            else if( tm === 'postback'){
              console.log("--------------------------------------------> ", tm);

              // Devuelve al servidor de Facebook que el mensaje ha sido recivido
              //   y que ya puede enviar los demas mensajes
              return res.ok('EVENT_RECEIVED');
            }

            // No hay nada
            else {
              console.log("--------------------------------------------> ERROR:", tm);
              console.error('Que Paso Problema no resulto mirar a ver que paso?');

              // Devuelve al servidor de Facebook que el mensaje ha sido recivido
              //   y que ya puede enviar los demas mensajes
              return res.ok('EVENT_RECEIVED');
            }

          }else{
            // Como la pagina no esta activa esta respondera
            // que no hay suscripcion a tal o no tiene el token
            return res.status(404);
          }        
        }
      }
      // Returns a '404 Not Found' if event is not from a page subscription
      else {
        return res.status(404);
      }
    },
};
