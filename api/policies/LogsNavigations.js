/**
 * LogsNavigations.js
 *
 * @module      :: Police
 * @description :: Registra todas las visitas hechas las paginas y guarda la informacion permitiendo un recorrido de todas ellas.
 * @autor       :: SaulNavarrov <Sinavarrov@gmail.com>
 */

async function registerNavegations (opt, cb) {

    var req = opt.req,
      res = opt.res,
      user = req.session.user,
      datosReg = {
        'xrealip': req.headers['xrealip'],
        'xforwarderfor': req.headers['xforwarderfor'],
        'xforwardedproto': req.headers['xforwardedproto'],
        'host': req.headers['host'],
        'url': req.url,
        'method': req.method,
        'complete': req.complete,
        'opController': req.options['controller'],
        'opAction': req.options.action,
        'xnginxproxy': req.headers['x-nginx-proxy'],
        'connection': req.headers['connection'],
        'cache-control': req.headers['cache-control'],
        'upgrade-insecure-requests': req.headers['upgrade-insecure-requests'],
        'user-agent': req.headers['user-agent'],
        'accept-encoding': req.headers['accept-encoding'],
        'accept-language': req.headers['accept-lenguage'],
        'cookie': req.headers['cookie'],
        'dnt': req.headers['dnt'],
        'if-none-match': req.headers['if-none-match'],
        'user': user === undefined ? 'Guest' : user.auth.id,
      };

    // Save Registro de navegación
    sails.log.debug('= =======> Polices')
    console.log(req.headers["x-forwarded-for"]);
    console.log(datosReg);
    // UserNavegations.create(datosReg).exec((e, rv) => {
    //   if (e) return cb(true, e);
    //   return cb(null, rv);
    // });
}


// Exportaciónes
module.exports = async (req, res, next) => {
  var options = {
    req: req,
    res: res
  };

  // Guarda el Registro de navegación.
  await registerNavegations(options);


  // Navegations.registerNavegations(options, (err, resNav) => {
  //   if (err) sails.log.error(err);
  // });

  // Pase
  return next();
};