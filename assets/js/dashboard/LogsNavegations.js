/**
 * LogNavegations.js
 * 
 * @description :: Funciones de la pagina Logs Navegations
 */

var LogsNavegations={};
    LogsNavegations.api = 'LogNavegations';

setTimeout(() => {
  
   io.socket.on('lognavegations', (rs) => { 
     console.log(rs)
     $('#Listado').append(rs);
  });
}, 1000);
    

// Pedir Lista de Navegaciones
LogsNavegations.List = (lim, ski, sna, sad) => {
  let options = {
    api: LogsNavegations.api,
    limit: lim,
    skip: ski,
    sna: sna || 'createdAt',
    sad: sad || 'DESC'
  };
  // Consulta a la api
  Cruds.List(options, (e, r, d) => {
    // Mostrar el Error en caso de que aparesca alguno
    if (e) fnAppS.errServer({ error: '500' });
    // si el statusCode no es igual a 200 muestre otro error
    else if (r.statusCode !== 200) fnAppS.errServer({ error: '!200', pag: LogsNavegations.api })
    else {
      // En caso de que no hallan datos
      if (!d.length) fnAppS.errServer({ error: 'No hay datos aun', pag: LogsNavegations.api })
      else {
        loadersList.attr({ "hidden": '' });
        cardTables.removeAttr('hidden');
        tableListTbody.html(''); //Clear Table

        // Corredor de la lista
        d.forEach((it, ind) => {
          // Funcion para imprimir listado
          LogsNavegations.PrinList({
            item: it,
            indx: ((skip * limt) + ind)
          });
        });
      }
    }
  });
};

// Imprime todo en pantalla
LogsNavegations.PrinList = (op) => {
  // Variables
  var it = op.item,
    ind = op.indx;

  // Contenido a imprimir
  tableContens.append(`<tr id="item-${it.id}">
    <td><label class="">
        <input type="checkbox" id="logCheck-${ind + 1}">
      </label>
    </td>
    <td>${it.method}</td>
    <td>${it.url}</td>
    <td class="">${it.user}</td>
    <td class="">${it.xrealip}</td>
    <td>${it.pais}</td>
    <td class="">${it.opController}</td>
    <th class="">${moment(it.createdAt).fromNow()}</th>
    <td><div class="btn-group">
      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"></button>
        <div class="dropdown-menu" role="menu" x-placement="bottom-start" style="position: absolute; transform: translate3d(67px, 38px, 0px); top: 0px; left: 0px; will-change: transform;">
          <a class="dropdown-item" href="#" onclick="LogsNavegations.View('${it.id}')">Ver Item</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#" onclick="LogsNavegations.Delete('${it.id}')">Delete Item</a>
        </div>
      </div>
    </td>
  </tr>`);

  $('input').iCheck({
    checkboxClass: 'icheckbox_flat',
    radioClass: 'iradio_flat'
  });
}

// Pone todos los Check a la lista
LogsNavegations.AllCheck = (opt) => {
  var checking = opt;
  var tableChildrenList = tableListTbody[0].childElementCount;
  for (var i = 0; i <= tableChildrenList; i++) {
    $('#logCheck-' + i).iCheck(checking);
  }
}

// Da la vista Previa de toda la información
LogsNavegations.View = (id) => {
  swal('Ver todo', id, 'success');
  $('#myModal').modal(options)
}

// Elimina la iformación de uno a uno
LogsNavegations.Delete = (id) => {
  swal({
    title: "Eliminar Item",
    text: "¿Desea Eliminar el Item?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    // Descide si lo eliminas
    if (willDelete) {
      // Realiza la consulta si desea eliminar todo
      Cruds.Delete({
        api: LogsNavegations.api,
        ids: id,
        csrf: $('#_csrf').val()
      }, (e, r) => {
        // Mostrar el Error en caso de que aparesca alguno
        if (e) swal('Fallo al Eliminar', 'Este Item no ha sido encontrado', 'warning');
        swal('Alerta', 'Se ha eliminado el item', 'success');
        LogsNavegations.DeleteItems(id);
      });
    } else {
      swal('Cancelado', "Se ha Canselado", 'success');
    }
  });
}

// Funcion para remover el item de la pantalla
LogsNavegations.DeleteItems = (id) => {
  $(`#item-${id}`).remove();
}

// Elimina todo lo que esta en la pantalla
LogsNavegations.AllDeletes = () => {
  swal({
    title: "Eliminar Todo",
    text: "¿Desea Eliminar todos los Item?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    // Descide si lo eliminas
    if (willDelete) {
      // Realiza la consulta si desea eliminar todo
      swal('Eliminandos');
    } else {
      swal('Cancelado', "Se ha Canselado", 'success');
    }
  });
}




// let Usuarios = {
//   uri: 'user',
//   init: () => {
//     let _this = Usuarios;
//     _this.list();
//   },

//   list: (lim, ski, sna, sad, ids, whe) => {
//     let _this = Usuarios,
//       options = {
//         url: _this.uri,
//         lim: lim || 20,
//         ski: ski || 0,
//         sna: sna || 'order',
//         sad: sad || '',
//         ids: ids || '',
//         whe: whe || '',
//       },
//       skip = options.ski,
//       limt = options.lim;

//     // Consultar la lista.
//     // e = Error En caso de que halla uno se presentara
//     // d = Datos devueltos
//     // r = Resultados y opciones de la peticion
//     Cruds.rea(options, (err, dat, res) => {
//       if (err) fnAppS.errServer({ error: '500' });
//       else if (res.statusCode !== 200) fnAppS.errServer({ error: '!200', pag: 'Usuarios' })
//       else {
//         if (!dat.length) fnAppS.errServer({ error: 'data0', pag: 'Usuarios' })
//         else {
//           loadersList.attr({ "hidden": '' });
//           tableList.removeAttr('hidden');
//           tableListTbody.html(''); //Clear Table
//            t.forEach((it, ind) => {
//             _this.printList({
//               item: it,
//               indx: ((skip * limt) + ind)
//             });
//           });
//           fnAppS.printPagList({
//             _v: _this,
//             li: limt,
//             pa: skip,
//             fn: 'Usuarios'
//           });
//         }
//       }

//       console.log(res)
//     });
//   },
// }