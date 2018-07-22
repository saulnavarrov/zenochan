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
const client = MessengerClient.connect(token_apiSaul);

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



/***************************************************************************
 * 
 * SaveMessageOut
 * @description :: Guarda el mensaje de ingresos de facebook de ingresos
 * @param {array} opt 
 * @param {array} body  
 * 
 ****************************************************************************/
var SaveMessageOut =  async function (opt, body){
  // Estructura del mensaje
  var saveData = {
    object: opt.ob,
    sequence: opt.seq,
    typeMess: 'resFB',
    text: opt.txt,
    textString: opt.text,
    textArray: !opt.txt ? [] : opt.text.split(' '),
    stikerId: opt.stiker,
    attachments: opt.attachments,
    idClient: opt.idClient,
    idPage: opt.idPage,
    sendread: 'resFB',
    messageComplete: body,
    timestamp: opt.times,
    read: 1
  }

  // console.log('= =======================================> Start save Out');
  // console.log(saveData)
  // console.log(' = = = = = > Body')
  // console.log(JSON.stringify(body));
  // console.log('= =======================================> Stop');
  // return cb(false, false);
}



/****************************************************************************
 * 
 * SaveReadMessage
 * @description :: Guarda el estado de Lectura.
 * @param {array} opt 
 * @param {array} body 
 * 
 ****************************************************************************/
var SaveReadMessage = async function (opt, s, body) {
  // Estructura del mensaje
  var saveData = {
    object: s.ob,
    sequence: s.seq,
    typeMess: 'SendMessReadsFB',
    text: s.txt,
    textString: s.text,
    textArray: !opt.txt ? [] : s.text.split(' '),
    stikerId: s.stiker,
    attachments: s.attachments,
    idClient: s.idClient,
    idPage: s.idPage,
    sendread: 'resFB',
    messageComplete: body,
    timestamp: s.times,
    read: 1
  }

  // Busca el Mensaje con el tiempo donde fue guardado.
  var reads = await MessengerMessages
    .find({
      'timestamp': opt.watermark
    })
    .catch(err => {
      reads = false;
      console.log(err)
    });
    
    // console.log('= = = = = ==============> Error > ',reads.length)

  // Actualiza el Mensaje que se ha Leido como tal.
  if (reads.length) {
    var readMes = typeof (reads) === 'undefined' ? 1 : reads[0].read;
    // console.log('= = = = = ==============> ', readMes)
    var readUpdate = await MessengerMessages
      .update({
        'timestamp': opt.watermark
      })
      .set({
        read: readMes + 1 ,
      })
      .fetch();
    }else{
      readUpdate = {
        error: true,
        message: 'No se encontro el mensaje que se va actualizar la lectura o es un mensaje enviado desde facebook'
      }
    }

  // Guarda el Mensaje de Lectura en el sistema.
  var messengerMessages = await MessengerMessages.create(saveData).fetch();

  // console.log('= =======================================> Start Save Read ');
  // console.log(JSON.stringify(reads[0].read));
  // console.log('= ============== =');
  // console.log(JSON.stringify(readUpdate));
  // console.log('= =======================================> Stop');
}



/****************************************************************************
 * 
 * SaveMessageIn
 * @function
 * @description :: Guardara todos los mensajes que entrano salend del sistema
 * 
 ****************************************************************************/
var SaveMessageIn = async function (opt, body) {

  // Estructura del mensaje
  var saveData = {
    object: opt.ob,
    sequence: opt.seq,
    typeMess: opt.type,
    text: opt.txt,
    textString: opt.text,
    textArray: !opt.txt ? [] : opt.text.split(' '),
    stikerId: opt.stiker,
    attachments: opt.attachments,
    idClient: opt.idClient,
    idPage: opt.idPage,
    sendread: 'toReceibe',
    messageComplete: body,
    timestamp: opt.times
  }

  // Guarda el mensaje
  var messengerMessages = await MessengerMessages.create(saveData).fetch();
  // console.log('= =======================================> Start Save Ms In');
  // console.log(JSON.stringify(messengerMessages));
  // console.log('= =======================================> Stop');

  // Envio para filtros del mensaje y saber el contenido que se esta pidiendo.
  // ya sea del ultimo en revision.
  FiltrosMessagesIn(saveData, body);
}




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
 * @param {array} opt :: Codigo para identificar el Cliente de facebook
 * @param {callback} cb 
 */
var IdentificacionDePerfiles = async (opt, cb) => {
  sails.log.debug('Function: IdentificacionDePerfiles()');

  var clientsDataId = await DataClients.find({
      "idfbs": String(opt)
    })
    .catch(err => {
      return {
        success: false,
        message: 'Cliente no Encontrado',
        error: err
      }
    });

    // console.log('/****************************************************************************');
    // console.log(clientsDataId.length)
    
    if (clientsDataId.length > 0) {
      console.log('/****************************************************************************');
        profileDataClients = clientsDataId[0];
      console.log('/****************************************************************************');
    }
    else{
      // Traera del facebook los datos del usuario
      var dataClientFb = client.getUserProfile(String(opt))
        .then(user => {
          if(user){
            // Llamando la funcion y pasando la correspondiente variable.
            // CreateUpdateUsersClints('a', user);
            profileDataClients = user;
            console.log('Nuevo Usuario ====>');
            console.log(user)
          }
        });
    }
}


// var CreateUpdateUsersClints = async (typeData, opt) => {
//   var user = opt;

  
//   if(typeData === 'a'){
//     if(user){

//       var newClienteData = await DataClients.create({
//             idfbs: String(user.id),
//             first_name: user.first_name,
//             last_name: user.last_name,
//             profile_pic: user.profile_pic,
//             locale: user.locale,
//             timezone: user.timezone,
//             gender: user.gender,
//             active: 'true',
  
//           })
//           .fetch();
      
//       profileDataClients = newClienteData;
//           console.log(newClienteData)
//     }
//     console.log(opt)
//     console.log(typeData)

//   }



  // if(typeData === 0){
    // console.log({
      // success: false,
      // message: `Las actualizaciones para este usuario se encuentra desactivadas por 
      // favor procesa a actualizar de manera manual o automatica esta opción`,
      // error: 'Actualizaciones Desactivadas para este Usuario'
    // });
  // }
  // Creación de nuevos clientes
  // if (typeData === Number(1)){
    // if(user.length>0){
      // console.log(user)
    // }
  // }
  // // Actualiza Automaticas
  // else if (typeData === 2) {

  // }
  // // Actualizaciones Manuales
  // else if (typeData === 3) {

  // }
//   // // No hace nada
//   else{

//   }
//   // Verificacion de contenido no es vacio
//   // }
// }



/****************************************************************************
 *
 * FiltrosMessagesIn
 * @description :: Filtrara que tipo de mensajes se enviaran al Autor 
 * debido a que todos estos no pueden ser procesados por su tipo de complejidad
 * como ejemplo los de son diferentes a los de tipo de textos.
 * @param {array} opt 
 * @param {arry} body 
 * @author :: SaulNavarrov <Sinavarrov@gmail.com>
 */
var FiltrosMessagesIn = async (opt, body) => {
  var type = opt.typeMess || null;

  // filtros para textos
  if(type === 'text'){
    // Funcion para buscar los datos en la base si existen o no.
    console.log(opt.textArray);
    // Respuestas Rapida de resolución
    client.sendMessage(String(opt.idClient), {
      text: `Reenviado: ${opt.textString}`,
    });

    // Funcion para controlar las palabras
    // ContadorDePalabrasYCorreccion(opt, body);
  }

  //Contenido no procesado
  else{
    console.log('Contenido no admitido');

    // Respuesta para el cliente que manda el mensaje
    // if(profileDataClients.length){
      setTimeout(() => {
        client.sendMessage(String(opt.idClient), {
          text: `Hola ${profileDataClients.first_name} ${profileDataClients.last_name}\nLo siento no soportamos este tipo de mensajes!`,
        });
      }, 300);
    // }
  }

}


/****************************************************************************
 *
 * ContadorDePalabras
 * @description :: 
 * @param {array} opt :: Array de datos de ingresos
 * @param {callback} cb Debolución del contenido para el contador del sistema 
 * @author :: SaulNavarrov <Sinavarrov@gmail.com>
 *
 *****************************************************************************/
var ContadorDePalabrasYCorreccion = async function (opt, body, cb) {

  console.log('controlador de palabras')
  // return cb(false, false);
}


/************************************************************************
 * modulos
 */
module.exports = {
  
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
      var body = req.body || 0;
      var object = body.object || 0;

      
      //  Codigos
      var s = {};
      var ob = body.object; // Object
      var en = body.entry[0]; // entrys
      var st = typeof (en.standby) !== 'undefined' ? en.standby[0] : en.messaging[0]; //stamby
      var ms = typeof (st.message) === 'undefined' ? false : st.message; // Mensajes
      var sq = typeof (ms) === 'undefined' ? false : ms.seq; // secuencia de mensajes
      var tx = typeof (ms) === 'undefined' ? false : typeof (ms.text) === 'string' ? true : false; // si es texto o no
      var at = typeof (ms) === 'undefined' ? false : typeof (ms.attachments) === 'undefined' ? true : ms.attachments[0]; // Documentos Adjuntos
      var re = typeof (en.standby) === 'undefined' ? false : st.read;
      var sf = typeof (en.standby) === 'undefined' ? false : st.delivery; // Mensajes enviados desde facebook
      
      
      if (en) {
        s.ob = ob;
        s.en = typeof (en.standby);
        s.idClient = st.sender.id;
        s.idPage = en.id;
        s.seq = typeof (st.message) === 'undefined' ? 0 : sq;
        s.txt = tx;
        s.text = !tx ? '' : st.message.text;
        s.type = !ms ? '' : tx ? 'text' : at.type;
        s.stiker = !ms ? 0 : tx ? 0 : typeof (at.payload.sticker_id) === 'undefined' ? 0 : at.payload.sticker_id;
        s.attachments = !ms ? {} : tx ? {} : at;
        s.times = st.timestamp; // hora en la que se guardo en servidor de facebook
        
        // Verificación de una pagina
        if (object === 'page') {

          // identifica el usuario que envia el mensaje Si tiene usuario
          if(s.seq >= 1){
            IdentificacionDePerfiles(s.idClient);
          }

          // Guarda el mensaje dependiendo si viene o va el mensaje, e identifica si viene desde facebook
          //  o es una respuesta automatica
          console.log('= = = ================================================================> Controlador: ');
          console.log(JSON.stringify(s))
          if(sf){
            SaveMessageOut(s, body);
          }else if(re){
            SaveReadMessage(re, s, body);
          }else{
            s.type === '' ? SaveMessageOut(s, body) : SaveMessageIn(s, body); //  SaveMessageIn(s, body) : SaveMessageOut(s, body);
          }
        }
        // Retorno de ok para el sistema de facebook
        return res.ok('EVENT_RECEIVED');
      }
      
      // Returns a '404 Not Found' if event is not from a page subscription
      else {
        return res.status(404);
      }
    },
};

