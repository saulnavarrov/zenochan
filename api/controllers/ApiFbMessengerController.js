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
  /**
   * Consultar y configurar propiedades de la api profile
   */
  // var tok = tokenSaulPruebas.token;
  //   var configDel = await PropertiesApiBotConfig('del', {
  //     fields: ["GET_STARTED"]
  //   },tok);
  //   console.log(configDel);
  
}

on();




// Devolucion de daos
module.exports = {};

/**
 * Funciones establecidas Creadas 
 */


/**
 * PropertiesApiBotConfig
 * @description :: 
 * @param {String} act :: Accion que debe hacer la Funcion.
 * @param {json} opt :: Conjunto de datos para procesar.
 * @param {String} tok :: Token de la Pagina
 * @returns {Json} r :: conjunto de datos de respuesta del servidor de facebook
 * @example :: 
 * 
 * @author :: SaúlNavarrov < Sinavarrov @gmail.com >
 */ 
async function PropertiesApiBotConfig(act, opt, tok) {
  // Variable que llena se cargara la devolucion de la información
  var r = [];
  
  // Trae toda la información de las configuraciones del bot
  /**
   * Verifica que configuraciones tiene el bot
   * @example :: GET_STARTED, PERSISTENT_MENU, TARGET_AUDIENCE, 
   *      WHITELISTED_DOMAINS, GREETING, ACCOUNT_LINKING_URL, 
   *      PAYMENT_SETTINGS, HOME_URL
   * @example ::
   * var tok = tokenSaulPruebas.token;
   * var configGet = await PropertiesApiBotConfig('get',{
   *   all: false,
   *   fields: 'GET_STARTED',
   * }, tok);
   * console.log(configGet);
   * @author :: SaúlNavarrov <Sinavarrov@gmail.com>
   */
  if(act === 'get'){
    var getConfig = opt.all ? '' : `fields=${opt.fields}&`; // opt.all ? '' : 'fields='+opt.fields+'&';
    // Function
    await rps({
        method: 'GET',
        uri: `https://graph.facebook.com/v2.6/me/messenger_profile?${getConfig}access_token=${tok}`
      })
      .then(rBody => {
        r = [{
          statusCode: 200,
          success: true,
          message: 'Config Messenger Bot Profile Get',
          data: JSON.parse(rBody)
        }];
      })
      .catch(rErr => {
        var er = JSON.parse(rErr.response.body);
        r = [{
          statusCode: rErr.statusCode,
          statusMessage: rErr.response.statusMessage,
          success: false,
          name: rErr.name,
          message: rErr.response.headers['www-authenticate'],
          error: er.error
        }];
      });
  }

  // Configura o Actualiza las propiedades del Boot
  /**  
   * var tok = tokenSaulPruebas.token;
   * // Configuraciones sencillas
   * var form = {
   *     "get_started": {'payload': "User_Get_Starter-ZenoChan"},
   *     // "greeting":[{ "locale": "default", "text": "Hello {{user_first_name}}!" }], // Para un solo idioma
   *     "greeting":[{"locale":"es_LA","text":"Hola! {{user_first_name}}. ¿Dime en que puedo ayudarte?"},{"locale":"default","text":"Hello! {{user_first_name}}. ¿En que puedo ayudarte?"}, {"locale":"en_US", "text":"Hello! {{user_first_name}}. How can I help you?"}], // Usado para multi idiomas
   * }
   * 
   * // Configuracion del 
   * var profileSet = await PropertiesApiBotConfig('set', {
   *   form: form
   *   }, tok)
   * 
   * // Resultados
   * console.log(profileSet);
   */
  else if(act === 'set'){
    // Function
    await rps({
      method: 'POST',
      uri: `https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${tok}`,
      form: opt.form,
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(rBody => {
        r = [{
          statusCode: 200,
          success: true,
          message: 'Config Messenger Bot Profile Set',
          data: JSON.parse(rBody)
        }];
      })
      .catch(rErr => {
        var er = JSON.parse(rErr.response.body);
        r = [{
          statusCode: rErr.statusCode,
          statusMessage: rErr.response.statusMessage,
          success: false,
          name: rErr.name,
          message: rErr.response.headers['www-authenticate'],
          error: er.error
        }];
      });
  }

  /**
   * Eliminar las configuraciones de las propiedades de las apis
   * @example :: GET_STARTED, PERSISTENT_MENU, TARGET_AUDIENCE, 
   *      WHITELISTED_DOMAINS, GREETING, ACCOUNT_LINKING_URL, 
   *      PAYMENT_SETTINGS, HOME_URL
   *
   * @example ::
   * var tok = tokenSaulPruebas.token;
   * var configDel = await PropertiesApiBotConfig('del', {
   *   fields: ["GET_STARTED","GREETING"]
   * },tok);
   * console.log(configDel);
   * @author :: SaúlNavarrov <Sinavarrov@gmail.com>
   */
  else if(act === 'del'){
    // Function
    await rps({
        method: 'DELETE',
        uri: `https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${tok}`,
        form: {
          "fields": opt.fields
        },
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(rBody => {
        r = [{
          statusCode: 200,
          success: true,
          message: 'Config Messenger Bot Profile Delete',
          data: JSON.parse(rBody)
        }];
      })
      .catch(rErr => {
        var er = JSON.parse(rErr.response.body);
        r = [{
          statusCode: rErr.statusCode,
          statusMessage: rErr.response.statusMessage,
          success: false,
          name: rErr.name,
          message: rErr.response.headers['www-authenticate'],
          error: er.error
        }];
      });
  }

  // No hay actividades para ejecutar
  else{
    // Devuelve una cadena de datos que no se configuran
    r = [{
      success: false,
      message: 'Action No Found',
      error: `act: undefined`
    }]
  }

  // Retorno de resultados
  return r;
}







/** **************************************************************************************
 * DataProfileFb
 * @description :: Identificación del perfil en facebook
 * @param {Json} opt :: Consjunto de datos datos
 *    id: id del cliente en faceboo
 *    tokenPage: Token de la pagina
 * @returns {Array} r :: conjunto de datos de respuesta del servidor de facebook
 * @example:: 
 * var buscarPerfil = await DataProfileFb({
 *    id: tokenSaulPruebas.client,
 *    tokenPage: tokenSaulPruebas.token
 *  })
 * @author :: SaúlNavarrov <Sinavarrov@gmail.com>
 *****************************************************************************************/
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


/**
 * funciones:
 * -> DataProfileFb(opt) => Trae los datos desde facebook de la persona
 *- > PropertiesApiBotConfig(act, opt, tok) => Cambia las propiedades del bot 
 */