var tableContens = $('#TableContent');
var cardTables = $('#cardTables');
var loadersList = $('#loadersList');
var tableListTbody = $('#TableContent tbody');
var skip = 0;
var limt = 25;

/***************************************************************************************************
 *                                          Menu function                                          *
 ***************************************************************************************************/
if (location.pathname) { pathLocation(); }
/**
 * pathLocation
 * @description :: Cambia y actualiza unas variables y ejecuta primeras ordenes. y da funcionamiento
 *              Menu, activandolo en su lugar.
 * @return {[type]} [description]
 */
function pathLocation() {
  switch (location.pathname) {
    case '/':
      break;
    case '/dashboard/logs/navegations':
      LogsNavegations.List();
      break;
    case '/dashboard/logs/systems':
      LogsSystems.list();
      break;
    default:
      break;
  }
};

/**
 * @description :: Controlara el toggle de sidebar izquierdo, y lo mantendra como lo dejo.
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
$(document).on('click', '.sidebar-toggle', e => {
  e.preventDefault();
  // true cerrado --- false abierto
  let sidebarLocal = localStorage.getItem('sidebar-toggle');
  // Guardara el estado en localStorage
  if (sidebarLocal !== 'false') {
    localStorage.setItem('sidebar-toggle', false);
  } else {
    localStorage.setItem('sidebar-toggle', true);
  }
});