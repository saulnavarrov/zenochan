/**
 * crud
 * @description :: Request al servidor, para ver, editar, agregar y eliminar elementos.
 * @type {Object}
 */
const u = '/api/';
let Cruds = {};
  Cruds.api= '',
  Cruds.limit= 25,  // Limite de resultados
  Cruds.skip= 0,    // Omision de resultados,
  Cruds.sna= 'id',  // Se ordenara por Id o otro que se escoja
  Cruds.sad= 'ASC', // Orden ASC o DESC
  Cruds.ids= '',    // Id para ver uno en concreto
  Cruds.dat= {},    // Datos adjuntos
  Cruds.hea= {},    // Headers consults Cabezeras
  Cruds.whe= {},    // Consulta
  Cruds.tok= '',    // Token CSRF
  Cruds.jwt= '',    // Token JWT


/**
 * Cruds.List()
 * @description :: Traera toda la lista a la pantalla
 */
Cruds.List = (opt, cb) => {
  // Variables
  let _this = Cruds,
      api= opt.api,
      limt= opt.limit || _this.limit,
      skip= opt.skip || _this.skip,
      sna= opt.sna || _this.sna,
      sad= opt.sad || _this.sad
   ;

    io.socket.request({
      method: 'get', 
      url: `${u}${api}`,
      data: {
        limit: limt,
        skip: (limt * skip),
        sort: sna+' '+sad
      },
      headers: {
        'x-csrf-token': '',
      }
    }, (r, d) => {
      if (r.statusCode === 500) {
        cb(true, d, r);
      } else {
        cb(false, d, r);
      }
    });
};

/**
 * Cruds.Delete
 * @description :: Eliminar uno o varios itens de la lista
 */
Cruds.Delete = (opt, cb) => {
  // Variables
  let _this = Cruds,
      api= opt.api,
      ids= opt.ids,
      csrf= opt.csrf
      ;
  
  // Consulta
  io.socket.request({
    method: 'delete',
    url: `${u}${api}/${ids}`, // '/api/lognavegations/'+id,
    data: {},
    headers:{
      'x-csrf-token': csrf
    }
  },(d) => {
    if(d === 'Not Found'){
      return cb(true, d);
    }else{
      return cb(false, d);
    }
  });
};

/***************************************************************************************************
 *                                       Funciones del APP                                         *
 ***************************************************************************************************/
let fnAppS = {
  searchs: () => {
    console.log('No activo')
  },


  // Limpiara todos los Forms
  clearForm: (op) => {
    var _this = fnAppS,
      forms = op.forms;

    $(`#${forms} input`).val('').removeAttr('style');
    $(`#${forms} textarea`).val('').removeAttr('style');
    $(`#${forms} select`).val('0').removeAttr('style');
  },

  /**
   * printPagList
   * @description :: Imprime la lista de pantalla
   */
  printPagList: (op) => {
    var _this = fnAppS,
      _v = op._v,
      li = op.li,
      pa = op.pa,
      options = {
        url: _v.uri,
        lim: 0,
        ski: 0
      };

    // al momento de cargar la pagina carga la cantidad
    if (resultIt < 0) {
      Cruds.rea(options, (e, d, r) => {
        if (e) { } else {
          resultIt = d.length; // Cantidades de li
          _this.pagListResult({
            _v: _v,
            fn: op.fn,
            li: li,
            pa: pa
          });
        }
      });
    }
    // cantidad ya cargada. no se hace de nuevo la peticion.
    else {
      _this.pagListResult({
        _v: _v,
        fn: op.fn,
        li: li,
        pa: pa
      });
    }
  },

  /**
   * pagListResult
   * @description :: activa y desactiva los botones de cambio de lista en resultado a acciones
   */
  pagListResult: (op) => {
    var _this = fnAppS,
      _v = op._v,
      fn = op.fn,
      li = op.li,
      pag = op.pa || 0;

    // Cantidades de li
    cantPag = Math.ceil(resultIt / li);

    pagNum.html('');
    pagNum.append(`<li class="paginate_button previous disabled" id="pagPrevL"><a href="#">Previous</a></li>`); // PrevList
    for (let a = 0; a < cantPag; a++) {
      pagNum.append(`<li class="paginate_button ${a === pag ? 'active' : ''}"><a href="#" onclick="${fn}.listPag(${a === pag ? '' : a})">${a + 1}</a></li>`);
    }
    pagNum.append(`<li class="paginate_button next disabled" id="pagNextL"><a href="#">Next</a></li>`); // NextList

    _this.prevNextPag({
      i: pag,
      fn: fn
    }); // Activara o desactivara los css de la paginacion.
  },

  /**
   * prevNextPag
   * @description :: Controla los botones de cambio de listas
   */
  prevNextPag: (op) => {
    let _this = fnAppS,
      pre = op.i - 1,
      nex = op.i + 1,
      pagPrev = $('#pagPrevL'),
      pagNext = $('#pagNextL');

    // Anterior paginacion.
    if ((op.i) === 0) {
      pagPrev.addClass('disabled');
      pagPrev.html(`<a href="#">Previous</a>`);
    } else {
      pagPrev.removeClass('disabled');
      pagPrev.html(`<a href="#" onclick="${op.fn}.listPag(${pre})">Previous</a>`);
    }

    // Siguiente paginacion.
    if ((op.i + 1) === cantPag) {
      pagNext.addClass('disabled');
      pagNext.html(`<a href="#">Next</a>`);
    } else {
      pagNext.removeClass('disabled');
      pagNext.html(`<a href="#" onclick="${op.fn}.listPag(${nex})">Next</a>`)
    }
  },

  errServer: (opt) => {
    let _this = fnAppS;

    if (opt.error === 'data0') {
      _this.infoList({
        type: 'info',
        title: `No hay información de ${opt.pag} en la Base de datos`,
        message: `Aun no se han creado ${opt.pag}`
      })
    }

    if (opt.error === '!200') {
      _this.infoList({
        type: 'danger',
        title: `Error al Cargar ${opt.pag}`,
        message: `Se ha presentado al cargar la lista ${opt.pag}. Actualize la pagina. <br>Sí el error persiste, contacte con soporte.`
      });
    }

    if (opt.error === '500') {
      _this.infoList({
        type: 'danger',
        title: 'Error Servidor',
        message: `Se ha presentado un error en el Servidor. Intentelo de nuevo. <br>Sí el error persiste avise a soporte y presente el error.`
      });
    }
  },

  /**
   * infoList
   * @description :: Imprime mensajes en el escritorio.
   */
  infoList: (op) => {
    var title = op.title || 'Error',
      message = op.message || `Se ha presentado un error en el Servidor.`,
      type = op.type || 'default';

    loadersList.attr({
      "hidden": ''
    });
    infoList.removeAttr('hidden');
    infoList.html('');
    infoList.html(`<section class="box box-solid box-${type} text-center" >
      <div class="box-header with-border">
        <h3 class="box-title">${title}</h3>
        <div class="box-tools pull-right"><button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button></div>
      </div>
      <div class="box-body">${message}</div>
    </section>`);
  },
};

  // list: (opt, cb) => {
  //   let _this = Cruds,
  //     api= opt.api,
  //     limt= opt.limit || _this.limit,
  //     skip= opt.skip || _this.skip,
  //     sna= opt.sna || _this.sna,
  //     sad= opt.sad || _this.sad
  //     ;

  //   io.socket.request({
  //     method: 'get', 
  //     url: `${u}${api}`,
  //     data: {
  //       limit: limt,
  //       skip: (limt * skip),
  //     },
  //     headers: {
  //       'x-csrf-token': '',
  //     }
  //   }, (r, d) => {
  //     if (r.statusCode === 500) {
  //       cb(true, d, r);
  //     } else {
  //       cb(false, d, r);
  //     }
  //   });

    
  // }


  //   // Poder Consultar cantidad
  //   query = `limit=${li}&skip=${li * sk}&sort=${sn}%20${sa}&where=${wh}`;

  //   // Request al Servidor
  //   io.socket.request({
  //     'method': 'get',
  //     'url': `${u}${ul}/${di}?${query}`,
  //     'data': {},
  //     'headers': {
  //       'x-csrf-token': tk,
  //       'Authorization': 'Bearer ' + jw,
  //       'head': he,
  //     }
  //   }, (d, r) => {
  //     if (r.statusCode === 500) {
  //       console.error(r.err);
  //       swal('Error', `Se ha presentado un error en el Servidor. Intentelo de nuevo, \nSÃ­ el error persiste avise a soporte.`, 'error');
  //       cb(true, d, r);
  //     } else {
  //       cb(false, d, r);
  //     }
  //   });
  // },


  // /**
  //  * creara datos nuevos
  //  * @param  {[type]}   opt [description]
  //  * @param  {Function} cb  [description]
  //  * @return {[type]}       [description]
  //  */
  // cre: (opt, cb) => {
  //   let ur = opt.url || '',        // url
  //     idi = opt.ids || '',        // Ver Uno en concreto
  //     hea = opt.hea || {},        // cabezera
  //     dat = opt.dat || {},        // Datos
  //     tok = opt.tok || '',        // token
  //     jwt = opt.jwt || '';        // token usuario

  //   // Peticion al servidor
  //   io.socket.request({
  //     'method': 'post',
  //     'url': `${u}${ur}`,
  //     'data': dat,
  //     'headers': {
  //       'x-csrf-token': tok,
  //       'Authorization': 'Bearer ' + jwt,
  //       'head': hea,
  //     }
  //   }, (d, r) => {
  //     if (r.statusCode === 500) {
  //       console.error(r.err);
  //       swal('Error', `Se ha presentado un error en el Servidor.\nIntentelo de nuevo, \nSÃ­ el error persiste avise a soporte.`, 'error');
  //       cb(true, d, r);
  //       console.log(d)
  //     } else {
  //       cb(false, d, r);
  //     }
  //   });
  // },

  // /**
  //  * actualizara nuevos datos
  //  * @param  {[type]}   opt [description]
  //  * @param  {Function} cb  [description]
  //  * @return {[type]}       [description]
  //  */
  // upd: (opt, cb) => {
  //   let ur = opt.url || '',        // url
  //     ids = opt.ids || '',        // Ver Uno en concreto
  //     hea = opt.hea || {},        // cabezera
  //     dat = opt.dat || {},        // Datos
  //     tok = opt.tok || '',        // token
  //     jwt = opt.jwt || '';        // token usuario

  //   // Peticion al servidor
  //   io.socket.request({
  //     'method': 'put',
  //     'url': `${u}${ur}/${ids}`,
  //     'data': dat,
  //     'headers': {
  //       'x-csrf-token': tok,
  //       'Authorization': 'Bearer ' + jwt,
  //       'head': hea,
  //     }
  //   }, (d, r) => {
  //     if (r.statusCode === 500) {
  //       console.error(r.err);
  //       swal('Error', `Se ha presentado un error en el Servidor.\nIntentelo de nuevo, \nSÃ­ el error persiste avise a soporte.`, 'error');
  //       cb(true, d, r);
  //     } else {
  //       cb(false, d, r);
  //     }
  //   });
  // },

  // /**
  //  * Eliminara datos
  //  * @param  {[type]}   opt [description]
  //  * @param  {Function} cb  [description]
  //  * @return {[type]}       [description]
  //  */
  // del: (opt, cb) => {
  //   let ur = opt.url || '',        // url
  //     idi = opt.ids || '',        // Ver Uno en concreto
  //     hea = opt.hea || {},        // cabezera
  //     dat = opt.dat || {},        // Datos
  //     tok = opt.tok || '',        // token
  //     jwt = opt.jwt || '';        // token usuario

  //   // Peticion al servidor
  //   io.socket.request({
  //     'method': 'delete',
  //     'url': `${u}${ur}/${idi}`,
  //     'data': dat,
  //     'headers': {
  //       'x-csrf-token': tok,
  //       'Authorization': 'Bearer ' + jwt,
  //       'head': hea,
  //     }
  //   }, (d, r) => {
  //     if (r.statusCode === 500) {
  //       console.error(r.err);
  //       swal('Error', `Se ha presentado un error en el Servidor.\nIntentelo de nuevo, \nSÃ­ el error persiste avise a soporte.`, 'error');
  //       cb(true, d, r);
  //     } else {
  //       cb(false, d, r);
  //     }
  //   });
  // },
// };


/**
 * [formVal description :: Validacion de formulario sensillo, casillas vacias
 * @type {Object}
 */
var formVal = {
  // Validando texto
  Text: (op, cb) => {
    let inp = $(`${op}`);
    // Confirma de que sea requerido
    if (inp.attr('required') === 'required') {
      // Confirma que el campo no este vacio
      if (inp.val() === '' || inp.val() === null || inp.val() === 0 || /^\s+$/.test(inp.val())) {
        inp.css({ 'border-color': 'red', 'box-shadow': '0px 0px 1px red' });
        cb(true);
      } else {
        inp.css({ 'border-color': 'green', 'box-shadow': '0px 0px 1px green' });
        cb(false);
      }
    }
  },

  // Validacion de numeros
  Number: (op, cb) => {
    let inp = $(`${op}`);
    // Confirma de que sea requerido
    if (inp.attr('required') === 'required') {
      if (inp.val() === '' || inp.val() === null || inp.val() === 0 || /^\s+$/.test(inp.val())) {
        inp.css({ 'border-color': 'red', 'box-shadow': '0px 0px 1px red' });
        cb(true);
      } else if (isNaN(inp.val())) {
        inp.css({ 'border-color': 'red', 'box-shadow': '0px 0px 1px red' });
        cb(true);
      } else {
        inp.css({ 'border-color': 'green', 'box-shadow': '0px 0px 1px green' });
        cb(false);
      }
    }
  },

  // Validaciones de Buttons Radio
  Radio: (op, cb) => {
    let inp = $(`input:radio[name=${op}]`);
    let inp2 = $(`input:radio[name=${op}]:checked`);
    let lab = $(`.${op}`);
    // Confirma de que sea requerido
    if (inp.attr('required') === 'required') {
      if (inp2.length === 0) { // Verifica que este seleccionado un 
        lab.css({ 'border-color': 'red', 'box-shadow': '0px 0px 1px red' });
        cb(true);
      } else {
        lab.css({ 'border-color': 'green', 'box-shadow': '0px 0px 1px green' });
        cb(false);
      }
    }
  }
}