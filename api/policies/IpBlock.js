/**
 * IpBlock
 * 
 * @description :: Bloqueare con este archivo los Paises o Ip de conexion a mi servidor de pagina web
 *      El historial se mantendra desde en la base de datos.
 * 
 * @docs   :: https://sailsjs.com/documentation/concepts/policies
 * @author :: SaulNavarrov <Sinavarrov@gmail.com>  
 */
const {ip2int, int2ip} = require('../controllers/IpGeosController');   // Controlador de IpGeos para 

module.exports = async (req, res, nxt) => {

  let ip = req.headers["x-forwarder-for"],
      ipInt = await ip2int(ip),
      country = {},
      ipGeos = {};

  // Busca la ip en la base de datos y coteja con los paises asociados
  var searchIp = await IpGeos.find({
    'ipFrom': {'<=': Number(ipInt)},
    'ipTo': {'>=': Number(ipInt)}
    }).populate('country');
  
  // Conversión de Array a JSON
  searchIp = searchIp[0]; // reasigno los datos a JSON
  country = searchIp.country; // variables de las countrys
  
  delete searchIp.country; // Eliminando countrys para las ips
  ipGeos = searchIp; // variables de las ips

  // Verificando de bloqueo del pais
  if ('B' === country.countryBlock) {
    sails.log.error('Pais Bloqueado: ' + ip + " P: " + country.cntry);

    // return
    return res.status(403).json({
      message: 'Block Ip Country Connect'
    });
  }


  // Verificando bloqueo de la IP's
  if ('B' === ipGeos.ipBlock) {
    sails.log.error('Ip Bloqueado: ' + ip +" P: " + country.cntry);

    // Return
    return res.status(403).json({
      message: 'Block Ip Connect'
    });
  }

  // console
  return nxt();
}