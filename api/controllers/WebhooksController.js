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



/****************************************************************************
 * 
 * saveMIn
 * @function
 * @description :: Guardara todos los mensajes que entrano salend del sistema
 * 
 ****************************************************************************/
var saveMIn = async function (opt) {
  var userId = opt.entry[0].messaging[0].sender.id || 0;
  var destine = opt.entry[0].id || 0;
  var message = opt.entry[0].messaging[0].message || {}; // Mensaje en concreto

  // Estructura del mensaje
  var saveData = {
    destine: userId, // Id quien envia
    body: opt,
    message: message,
    read: 0,
    check: 1,
    sendread: 'toReceibe',
    responseId: destine, // Id quien Recive
  }

  // -> Fn -> Contador de palabras
  CuentaPalabras({
    m: message
  });

  // Guarda el mensaje
  // var saveMB = await M.create(saveData).fetch();
  console.log(JSON.stringify(saveData));

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
    console.log(JSON.stringify(body));

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
      // var entry = body.entry[0] || 0;
      // var messaging = entry['messaging'] || 0;
      // var message = messaging[0] || 0;
      // var attachments = 0 || 0;

      //  Codigos
      var s = {};
      var en = body.entry[0];
      var st = body.entry[0].standby[0];
      var att = typeof(st.message.attachments) === 'undefined' ? true : st.message.attachments[0];
      var txt = typeof(st.message.text) !== 'undefined' ? true : false;

      console.error(typeof (st.message.attachments) === "undefined" ? 'undefined' : 'con datos');

      if (en) {
        s.ob = body.object;
        s.idClient = st.sender.id;
        s.idPage = en.id;
        s.seq = st.message.seq;
        s.txt = txt;
        s.text = !txt ? null : st.message.text;
        s.type = txt ? 'text' : att.type;
        s.stiker = txt ? null : typeof (att.payload.sticker_id) === 'undefined' ? null : att.payload.sticker_id;
        // s.image = s.type !== "image" ? '' : att.payload.url;
        s.attachments = txt ? {} : att;
        
        // Verificación de una pagina
        if (object === 'page') {
          console.log(JSON.stringify( body ));

          // Respuesta si es txt
          if(txt){
            client.sendMessage(String(s.idClient), {
              text: `Response: ${s.text}`,
            });
          }
        }
        // Retorno de ok para el sistema de facebook
        return res.ok('EVENT_RECEIVED');
      }
      


        // -> Fn -> Guardar mensaje en la base de datos
        // saveMIn(body);


        // entry.messaging.forEach( even => {
        //   console.log(even);
        // });

        // console.log('======================>');
        // console.log(entry);
        // console.log(message);
        // console.log(messaging);
        // console.log(attachments);
        // console.log(JSON.stringify(body));
        // console.log('======================>');

      else {
        // Returns a '404 Not Found' if event is not from a page subscription
        return res.status(404);
      }
    },
};

