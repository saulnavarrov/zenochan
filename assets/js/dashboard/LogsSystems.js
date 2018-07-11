/**
 * LogSystems.js
 * 
 * @description :: Funciones de la pagina Logs Systems
 */

var LogsSystems = {};

LogsSystems.list = () => {
  let uri = 'logSystems';

  // Variables para comunicar con la Api
  io.socket.request({
    method: 'get',
    url: '/api/logSystems?limit=20',
    data: { },
    headers: {
      'x-csrf-token': '',
    }
  }, (rsdt, jwrs) => {
    if (jwrs.error) {
      console.log(jwrs.statusCode);
      return;
    }

    console.log(jwrs);
  });
}