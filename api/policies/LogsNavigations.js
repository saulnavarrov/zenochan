/**
 * LogsNavigations.js
 *
 * @module      :: Police
 * @description :: Registra todas las visitas hechas las paginas y guarda la informacion permitiendo un recorrido de todas ellas.
 * @autor       :: SaulNavarrov <Sinavarrov@gmail.com>
 */
const rps = require('request-promise');

async function registerNavegations (opt, cb) {

    let req = opt.req,
      res = opt.res,
      user = req.session.user,
      ip = req.headers["x-forwarded-for"],
      datosReg = {
        'xforwarderfor': req.headers["x-forwarded-for"] || '',
        'xrequestid': req.headers['x-request-id'] || '',
        'xforwardedproto': req.headers['x-forwarded-proto'] || '',
        'xrequeststart': req.headers['x-request-start'] || '',
        'host': req.headers['host'],
        'url': req.url,
        'method': req.method,
        'complete': req.complete,
        'opController': req.options['controller'],
        'opAction': req.options.action,
        'xnginxproxy': req.headers['x-nginx-proxy'] || '',
        'connection': req.headers['connection'],
        'cacheControl': req.headers['cache-control'],
        'upgradeInsecureRequests': req.headers['upgrade-insecure-requests'],
        'userAgent': req.headers['user-agent'],
        'acceptEncoding': req.headers['accept-encoding'],
        'acceptLanguage': req.headers['accept-lenguage'] || req.i18n.locale,
        'locale': req.i18n.locale,
        'cookie': req.headers['cookie'],
        'dnt': req.headers['dnt'],
        'ifNoneMatch': req.headers['if-none-match'],
        'user': user === undefined ? 'Guest' : user.auth.id,
      };


    // Consultando ips
    if(typeof(ip) !== 'undefined'){
      await rps({
        method: 'GET',
        uri: `http://ip-api.com/json/${ip}`
      }).then(rBody => {
        console.log(rBody);
      }).catch(rErr => {
        console.log(rErr);
      });
    }else{
      console.log('No hay ip en el contenedor')
    }

    // iplocation()
    //   .then(d => {
    //     sails.log.debug('Bienvenidos ip');
    //     datosReg.ipData = d;
    //     saveData(datosReg);
    //   })
    //   .catch(dErr => {
    //     sails.log.error(new Error('Error con la ip'));
    //     sails.log.error(dErr);
    //     datosReg.ipData = {}
    //     saveData(datosReg);
    //   });
    console.log(req.headers["x-forwarded-for"]);
        
  }

async function saveData(dat) {
  console.log(dat);  
}

    // await LogsNavigations.create(datosReg).fetch();


// Exportaciónes
module.exports = async (req, res, next) => {
  var options = {
    req: req,
    res: res
  };

  // Guarda el Registro de navegación.
  await registerNavegations(options);

  // continue
  return next();
};