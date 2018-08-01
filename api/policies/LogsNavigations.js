/**
 * LogsNavigations.js
 *
 * @module      :: Police
 * @description :: Registra todas las visitas hechas las paginas y guarda la informacion permitiendo un recorrido de todas ellas.
 * @author      :: SaulNavarrov <Sinavarrov@gmail.com>
 */
// requires
const rps = require('request-promise');


/**
 * registerNavegations
 * @description :: Controlador de funciones del police
 * @param {*} opt :: Datos para Require y response
 * @author :: SaúlNavarrov <Sinavarrov@gmail.com>
 */
async function registerNavegations (opt) {

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



    // await saveDataLogsNavigations(datosReg);

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
    if (typeof (ip) !== 'undefined') {
      
      // Buscara la ip si esta en la base de datos para no consultarla
      var findIpDb = await IpsLocations.find({ where: { query: ip }, select: ['id', 'query'] });
      var findIp = findIpDb[0]; // Paso la ip de Array a Json

      // La ip no existe en mi base de datos
      if(!findIpDb.length){
        // Creamos la ip en la base de datos para luego asociarla con las nuevas ip logs con el fin
        // de crear un registro de las ips que se conecten para usarlas en un futuro proximo
        var newIpLocations = await IpsLocations.create({
          query: String(ip)
        }).fetch();

        // IpGuardada
        datosReg.ipsl = newIpLocations.id;
        await saveDataLogsNavigations(datosReg);
      }else{
        // Guarda cuando existe datos en la base de datos
        datosReg.ipsl = findIp.id;
        await saveDataLogsNavigations(datosReg);
      }
    }else{
      // Guarda los datos sin importar de donde venga
      datosReg.ipsl = '';
      await saveDataLogsNavigations(datosReg);
    }        
  }


/**
 * saveDataLogsNavigations
 * @description :: Guarda en la base de datos el logs de las Navegaciones
 * @param {Json} dat :: Datos que guardara
 * @author SaúlNavarrov <Sinavarrov@gmail.com>
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