/**
 * LogsNavigations.js
 *
 * @module      :: Police
 * @description :: Registra todas las visitas hechas las paginas y guarda la informacion permitiendo un recorrido de todas ellas.
 * @author      :: SaulNavarrov <Sinavarrov@gmail.com>
 */

 // requires
const rps = require('request-promise');



/** ************************************************************************************************
 * registerNavegations
 * @description :: Controlador de funciones del police
 * @param {*} opt :: Datos para Require y response
 * @author :: SaúlNavarrov <Sinavarrov@gmail.com>
 ** ************************************************************************************************/
async function registerNavegations (opt) {

    let req = opt.req,
        rr = {},
        nxe = true,
        res = opt.res,
        user = req.session.user,
        ip = req.headers["x-forwarder-for"],
        datosReg = {
        country: '',
        ctry: '',
        cntry: '',
        'xforwarderfor': req.headers["x-forwarder-for"],
        'xrealip': req.headers['x-real-ip'],
        'xforwardedproto': req.headers['x-forwarder-proto'],
        'host': req.headers['host'],
        'url': req.url,
        'userAgent': req.headers['user-agent'],
        'method': req.method,
        'complete': req.complete,
        'opController': req.options['controller'],
        'opAction': req.options.action,
        'xnginxproxy': req.headers['x-nginx-proxy'],
        'connection': req.headers['connection'],
        'cacheControl': req.headers['cache-control'],
        'xHubSignature': req.headers['x-hub-signature'],
        'acceptEncoding': req.headers['accept-encoding'],
        'acceptLanguage': req.headers['accept-lenguage'] || req.i18n.locale,
        'locale': req.i18n.locale,
        'cookie': req.headers['cookie'],
        'ifNoneMatch': req.headers['if-none-match'],
        'user': user === undefined ? 'Guest' : user.auth.id,
      };



    /** *************************************************************************************** */
    //                          CONFIGURACION ADICIONAL
    //      MEJORAR ESTA CONFIGURACIÓN DEBIDO A QUE HAY CIERTOS RANGOS DE IP QUE DEBEN
    //      HACER LA CONEXION PARA PODER MANTENER EL BOT ASALVO DE CUALQUIER INSTRUCCION
    //      YA QUE ESTA ABIERTO A QUE CUALQUIER PERSONA ENVIE DATOS DESDE FACEBOOK
    //  
    //      USAR UN PROVEEDOR DE IPS PARA ACTUALIZAR LOS DATOS
    //      MANTENER UNA BASE DE DATOS DE IP'S QUE SE CONECTARON CON NOSOTROS Y PODER 
    //      EVITAR LA VERIFICACION CONSTANTE
    //
    /****************************************************************************************** */

    var intip = ip2int(ip);
    var ipint = int2ip(intip);

    var searchIp = await IpGeos.find({
      'ipFrom': {'<': Number(ip2int(ip))},
      'ipTo': {'>': Number(ip2int(ip))}
      }).populate('country');
    
    // Lo guarda con el pais de origen de los datos
    if(searchIp.length){
      searchIp = searchIp[0]; // reasigno los datos a JSON
      
      datosReg.country = searchIp.country.country;
      datosReg.ctry = searchIp.country.ctry;
      datosReg.cntry = searchIp.country.cntry;

      await saveDataLogsNavigations(datosReg);
    }else{
      await saveDataLogsNavigations(datosReg);
    }

    // Consultando ips
    // Trae una ip de conexion
    // if (typeof (ip) !== 'undefined') {
      
    //   // Buscara la ip si esta en la base de datos para no consultarla
    //   var findIpDb = await IpsLocations.find({ where: { query: ip }, select: ['id', 'query'] });
    //   var findIp = findIpDb[0]; // Paso la ip de Array a Json

      
    //   // La ip no existe en mi base de datos
    //   if(!findIpDb.length){
        
    //     await rps({
    //       method: 'GET',
    //       uri: `http://ip-api.com/json/${ip}`
    //     })
    //     .then(rBody => {
          
    //       // funcion para guardar los datos
    //       rr = rBody;// saveNewIps(datosReg, rBody);
    //       nxe = true;
          
    //     })
    //     .catch(rErr => {
    //       sails.log.error(rErr);
    //       // Guarda sin no hay datos
    //       datosReg.ipsl = '';
    //       rr = rErr;
    //       nxe = false;
    //     });
        
    //     // Luego de haber buscado las ips
    //     if(nxe){
    //       // Creamos la ip en la base de datos para luego asociarla con las nuevas ip logs con el fin
    //       // de crear un registro de las ips que se conecten para usarlas en un futuro proximo
    //       var newIpLocations = await IpsLocations.create({
    //         query: rr.query,
    //         as: rr.as,
    //         city: rr.city,
    //         isp: rr.isp
    //       }).fetch();

    //       sails.log.debug(JSON.parse (rr));
    //       sails.log.debug(newIpLocations);
    //     }
    //   }



    //       // IpGuardada
    //       if(!typeof (newIpLocations.UsageError)){
    //         datosReg.ipsl = newIpLocations.id;
    //         saveDataLogsNavigations(datosReg);
    //       }

    //     }else{
    //       datosReg.ipsl = '';
    //       await saveDataLogsNavigations(datosReg);
    //     }

    //   }else{
    //     // Guarda cuando existe datos en la base de datos
    //     datosReg.ipsl = findIp.id;
    //     await saveDataLogsNavigations(datosReg);
    //   }

    // }else{
    //   // Guarda los datos sin importar de donde venga
    //   datosReg.ipsl = '';
    //   await saveDataLogsNavigations(datosReg);
    // }  
  }



/** ************************************************************************************************
 * saveDataLogsNavigations
 * @description :: Guarda en la base de datos el logs de las Navegaciones
 * @param {Json} dat :: Datos que guardara
 * @author SaúlNavarrov <Sinavarrov@gmail.com>
 */
async function saveDataLogsNavigations(dat) {
  var da = await LogsNavigations.create(dat).fetch();
}



/** ************************************************************************************************
 * Exportar Modulos
 * @description :: Exportacion de todas funciones sin tener que importar los archivos.
 * @param {Array} req 
 * @param {Array} res 
 * @param {Array} next
 * @author :: SaulNavarrov <Sinavarrov@gmail.com> 
 * ************************************************************************************************/
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



/** ************************************************************************************************
 * int2ip
 * @description :: convierte el valor entero a una cadena de Ip
 * @param {Int32} ipInt : Numero de para cambiar y darme la ip
 * @returns {String} Retorno de la Ip en IPv4
 * @author :: SaulNavarrov <Sinavarrov@gmail.com>
 * ************************************************************************************************/
function int2ip (ipInt) {
    return ( (ipInt>>>24) +'.' + (ipInt>>16 & 255) +'.' + (ipInt>>8 & 255) +'.' + (ipInt & 255) );
}



/** ************************************************************************************************
 * ip2int
 * @description :: Convierte la ip en un valor Entero.
 * @param {String} ip :: Ip formato IPv4
 * @author :: SaulNavarrov <Sinavarrov@gmail.com>
 * ************************************************************************************************/
function ip2int(ip) {
  return ip.split('.').reduce(function (ipInt, octet) {
    return (ipInt << 8) + parseInt(octet, 10)
  }, 0) >>> 0;
}