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



    await saveDataLogsNavigations(datosReg);

    //                          CONFIGURACION ADICIONAL
    //      MEJORAR ESTA CONFIGURACIÓN DEBIDO A QUE HAY CIERTOS RANGOS DE IP QUE DEBEN
    //      HACER LA CONEXION PARA PODER MANTENER EL BOT ASALVO DE CUALQUIER INSTRUCCION
    //      YA QUE ESTA ABIERTO A QUE CUALQUIER PERSONA ENVIE DATOS DESDE FACEBOOK
    //  
    //      USAR UN PROVEEDOR DE IPS PARA ACTUALIZAR LOS DATOS
    //      MANTENER UNA BASE DE DATOS DE IP'S QUE SE CONECTARON CON NOSOTROS Y PODER 
    //      EVITAR LA VERIFICACION CONSTANTE
    //
    /***************************************************************************************** */

    // Consultando ips
    // Trae una ip de conexion
    // 
    // if (typeof (ip) !== 'undefined') {
      
    //   // Buscara la ip si esta en la base de datos para no consultarla
    //   var findIpDb = await IpsLocations.find({ where: { query: ip }, select: ['id', 'query'] });
    //   var findIp = findIpDb[0]; // Paso la ip de Array a Json

      
    //   // La ip no existe en mi base de datos
    //   if(!findIpDb.length){
    //     var newIpLocations
    //   }else{

    //   }

    // }else{
    //   sails.log.debug('No hay contenido en la var ip: ', ip);
    // }
        
  }


/**
 * saveDataLogsNavigations
 * @param {Json} dat :: Datos que guardara  
 */
async function saveDataLogsNavigations(dat) {
  await LogsNavigations.create(dat).fetch();
}



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