/**
 * ApiFbMessengerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const rps = require('request-promise');


// Exportación
module.exports = {
  text: sendText,
};




// on();
//*********************************************************************************** */
// Funcion de pruebas de la api
async function on() {
  var tok = `EAAFPdRVJsDoBAClzsa0N0RqrFCYqpcLdDKFNPn2XtTAoDYLwhZCocKO0ZBchlNpZC3CNr1DZA8cWYWhA4RjsYIpJPWHmhNjFxAq166I6ZCP1XRFob6HcJ6C95JWBjX51F69tRUOZBvtcX07Wa8bshrLSryaP0jT6x3JxHdV5yvU9p56UMOrAvW`;
  var id = '1703497029718211';
  
  var text = await sendText(id, 'bienvenidos a la nueva api', tok);
  console.log(text)
  
}


/** /***********************************************************************************
 * sendText
 * @description :: Envio de mensajes de Texto desde la pagina
 * @param {String} spid 
 * @param {String} text 
 * @param {String} tok 
 * @author SaúlNavarrov 
 */
async function sendText(spid, text, tok){
  sails.log.debug(`= =========== => Funcion Send Text`);

  console.log(spid)
  console.log(text)
  console.log(tok)

  // if(true){
  //   return false;
  // }


  // var e = [], // Retorno de Datos
  //     dat = {}; // Armando del texto de envio

  // // Revision de errores
  // // spid
  // if (typeof (spid) !== 'string' || !spid.length) {
  //   e.spid = {
  //     success: false,
  //     error: 'spid en blanco',
  //     message: 'El spid del usuario no puede estar en blanco o una cadena vacia'
  //   }
  //   e.r = true;
  // }

  // // text
  // if (typeof (text) !== 'string' || !text.length) {
  //   e.text = {
  //     success: false,
  //     error: 'text en blanco',
  //     message: 'El "text" no se permite texto en blanco'
  //   }
  //   e.r = true;
  // }

  // // token
  // if (typeof (tok) !== 'string' || !tok.length) {
  //   e.tok = {
  //     success: false,
  //     error: 'tok en blanco',
  //     message: 'El "tok" no se permite texto en blanco'
  //   }
  //   e.r = true;
  // }

  // // Retorno de Errores
  // if (e.r) {
  //   delete e.r;
  //   return e
  // }

  // // Armando Texto para enviar
  // var type = `messages`;
  // dat.text = text;
  
  // // Envio de datos
  // return apiToMessenger(spid, dat, tok, type);
}



/** **********************************************************************************
 * apiToMessenger
 * @description Hace la llamada a Facebook Api Messenger para entregar el mensaje
 * @param {String} psid :: Id del usuario a quien se envia el mensajes
 * @param {Json} resp :: Conjunto de datos que se envian sea texto imagen u otro tipo
 * @param {String} tok :: Token del Pagina a quien se envia los datos
 * @param {String} type :: Tipo de mensaje en la url Ejemplo: ('messages');
 */
async function apiToMessenger(psid, resp, tok, type){
  sails.log.debug(`= =========== => Funcion Api To Messenger`);

  // Retorno de datos
  var r = {};

  // Contruccion de la caja de Datos
  let req_body = {
    'recipient': {
      'id': psid
    },
    'message': resp
  };

  // Send the HTTP request to the Messenger Platform
  await rps({
    'uri': `${sails.config.uriFb}${ typeof (type) === 'undefined' ? 'messages' : type }`,
    'qs': {'access_token': tok },
    'method': 'POST',
    'json': req_body
  }).then(rBody => {
    r = [{
      statusCode: 200,
      success: true,
      message: 'Response Data',
      data: rBody
    }]
  }).catch(rErr => {
    r = [{
      statusCode: rErr.statusCode,
      statusMessage: rErr.response.statusMessage,
      success: false,
      name: rErr.name,
      message: rErr.response.headers['www-authenticate'],
      error: rErr.response.body
    }];
    console.error(new Error(rErr.response.headers['www-authenticate']));
  });

  // Retorno de resultados
  return r;
}