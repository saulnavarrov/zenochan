/**
 * IpGeosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


/** ************************************************************************************************
 * int2ip
 * @description :: convierte el valor entero a una cadena de Ip
 * @param {Int32} ipInt : Numero de para cambiar y darme la ip
 * @returns {String} Retorno de la Ip en IPv4
 * @author :: SaulNavarrov <Sinavarrov@gmail.com>
 * ************************************************************************************************/
async function int2ip(ipInt) {
  return ((ipInt >>> 24) + '.' + (ipInt >> 16 & 255) + '.' + (ipInt >> 8 & 255) + '.' + (ipInt & 255));
}



/** ************************************************************************************************
 * ip2int
 * @description :: Convierte la ip en un valor Entero.
 * @param {String} ip :: Ip formato IPv4
 * @author :: SaulNavarrov <Sinavarrov@gmail.com>
 * ************************************************************************************************/
async function ip2int(ip) {
  return ip.split('.').reduce(function (ipInt, octet) {
    return (ipInt << 8) + parseInt(octet, 10)
  }, 0) >>> 0;
}

module.exports = {

  int2ip: int2ip,
  ip2int: ip2int

};


