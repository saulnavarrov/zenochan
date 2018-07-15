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

//
const client = MessengerClient.connect(token_apiSaul);

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

  console.log('= =======================================> Start save Out');
  console.log(JSON.stringify(body));
  console.log('= =======================================> Stop');
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
  // // Estructura del mensaje
  // var saveData = {
  //   object: s.ob,
  //   sequence: s.seq,
  //   typeMess: s.type,
  //   text: s.txt,
  //   textString: s.text,
  //   textArray: !opt.txt ? [] : s.text.split(' '),
  //   stikerId: s.stiker,
  //   attachments: s.attachments,
  //   idClient: s.idClient,
  //   idPage: s.idPage,
  //   sendread: 'reads',
  //   messageComplete: body,
  //   timestamp: s.times,
  //   read: 1
  // }

  // Busca el Mensaje con el tiempo donde fue guardado.
  var reads = await MessengerMessages
    .find({
      'timestamp': opt.watermark
    });

  // // Actualiza el Mensaje que se ha Leido como tal.
  // if(reads){
  //   var readUpdate = await MessengerMessages
  //     .update({
  //       'timestamp': opt.watermark
  //     })
  //     .set({
  //       read: Number(reads[0].read) + 1,
  //     })
  //     .fetch();
  //   }else{
  //     readUpdate = {
  //       error: true,
  //       message: 'No se encontro el Texto que se va actualizar'
  //     }
  //   }

  // Guarda el Mensaje de Lectura en el sistema.
  // var messengerMessages = await MessengerMessages.create(saveData).fetch();

  console.log('= =======================================> Start Save Read ');
  console.log(JSON.stringify(reads));
  console.log('= =======================================> Stop');
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

  // -> Fn -> Contador de palabras
  // CuentaPalabras({
  //   m: message
  // });

  // Guarda el mensaje
  var messengerMessages = await MessengerMessages.create(saveData).fetch();
  console.log('= =======================================> Start Save Ms In');
  console.log(JSON.stringify(messengerMessages));
  console.log('= =======================================> Stop');

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
var ContadorDePalabras = async function (opt, cb) {

  return cb(false, false);
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

      // console.log(JSON.stringify(body))

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
          // Guarda el mensaje dependiendo si viene o va el mensaje, e identifica si viene desde facebook
          //  o es una respuesta automatica
          console.log('= = = ================================================================> Read: ', re);
          if(re){
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

