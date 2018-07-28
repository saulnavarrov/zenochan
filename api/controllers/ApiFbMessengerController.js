/**
 * ApiFbMessengerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const rps = require('request-promise');

const uriFb = `https://graph.facebook.com/`; // Url de facebook pruebas

// Datos de pruebas
var tokenSaulPruebas = {
  idPage: '2083506518327974',
  client: '1703497029718211',
  token: `EAAFPdRVJsDoBAClzsa0N0RqrFCYqpcLdDKFNPn2XtTAoDYLwhZCocKO0ZBchlNpZC3CNr1DZA8cWYWhA4RjsYIpJPWHmhNjFxAq166I6ZCP1XRFob6HcJ6C95JWBjX51F69tRUOZBvtcX07Wa8bshrLSryaP0jT6x3JxHdV5yvU9p56UMOrAvW`,
};


// Ejecucion de datos
async function on () {
  

  /**
   * Ejemplo de la busqueda de datos
   */
  // var buscarPerfil = await DataProfileFb({
  //   id: tokenSaulPruebas.client,
  //   tokenPage: tokenSaulPruebas.token
  // })

  // console.log(buscarPerfil)



  /**
   * Pruebas basicas
   */
  // Consultar propiedades del Bot Messenger
  /* 
  var tok = tokenSaulPruebas.token;
  await rps({
      method: 'GET',
      uri: `https://graph.facebook.com/v2.6/me/messenger_profile?fields=get_started&access_token=${tok}`
    })
    .then(rBody => {
      console.log(rBody)
    })
    .catch(rErr => {
      console.error(rErr);
    });
    */



  /**
   * Consultar y configurar propiedades de la api profile
   */
  // var tok = tokenSaulPruebas.token;
  // var form = {
      // "get_started": {'payload': "User_Get_Starter-ZenoChan"},
      // ""
  // }
  // await rps({
  //     method: 'POST',
  //     uri: `https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${tok}`,
  //     form: form,
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //   })
  //   .then(rBody => {
  //     console.log(rBody)
  //   })
  //   .catch(rErr => {
  //     console.error(rErr);
  //   });



  
  /**
   * Eliminar las configuraciones de las propiedades de las apis
   * @example :: GET_STARTED, PERSISTENT_MENU, TARGET_AUDIENCE, WHITELISTED_DOMAINS, GREETING, ACCOUNT_LINKING_URL, PAYMENT_SETTINGS, HOME_URL
   */
  // var tok = tokenSaulPruebas.token;
  // await rps({
  //     method: 'DELETE',
  //     uri: `https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${tok}`,
  //     form: {
  //         "fields": [
  //           "GET_STARTED"
  //         ]
  //     },
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //   })
  //   .then(rBody => {
  //     console.log(rBody)
  //   })
  //   .catch(rErr => {
  //     console.error(rErr);
  //   });
}

// curl -X POST -H "Content-Type: application/json" -d '{
//   "get_started": {"payload": "Empezar Me"}
// }
// ' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAAFPdRVJsDoBAClzsa0N0RqrFCYqpcLdDKFNPn2XtTAoDYLwhZCocKO0ZBchlNpZC3CNr1DZA8cWYWhA4RjsYIpJPWHmhNjFxAq166I6ZCP1XRFob6HcJ6C95JWBjX51F69tRUOZBvtcX07Wa8bshrLSryaP0jT6x3JxHdV5yvU9p56UMOrAvW"

on();




// Devolucion de daos
module.exports = {};

/**
 * Funciones establecidas Creadas 
 */


/**
 * DataProfileFb
 * @description :: Identificación del perfil en facebook
 * @param {Json} opt :: Consjunto de datos datos
 *    id: id del cliente en faceboo
 *    tokenPage: Token de la pagina
 * @returns {Array} r :: conjunto de datos de respuesta del servidor de facebook
 * @author :: SaúlNavarrov <Sinavarrov@gmail.com>
 * @example:: 
 * var buscarPerfil = await DataProfileFb({
 *    id: tokenSaulPruebas.client,
 *    tokenPage: tokenSaulPruebas.token
 *  })
 */
async function DataProfileFb(opt) {
  // Carga de datos
  var r = []; // Retorno de datos
  var rpOp = {
    method: 'GET',
    uri: `${uriFb}${opt.id}?access_token=${opt.tokenPage}`,
    resolveWithFullResponse: true
  };

  // Busqueda de datos de Perfil
  await rps(rpOp)
    .then(rBody => {
      r = [{
        statusCode: 200,
        success: true,
        message: 'Id Profile Yes Found',
        data: JSON.parse(rBody.body)
      }]
    })
    .catch(err => {
      var er = JSON.parse(err.response.body);
      r = [{
        statusCode: err.statusCode,
        statusMessage: err.response.statusMessage,
        success: false,
        name: err.name,
        message: err.response.headers['www-authenticate'],
        error: er.error
      }];
    })

  // Retorno de datos
  return r;
}