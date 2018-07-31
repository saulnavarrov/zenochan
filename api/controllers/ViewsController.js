/**
 * ViewsController
 *
 * @description :: Controlador de todas las paginas que contenga la aplicacion
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  'index': async (req, res) => {
    return res.view('pages/homepage');
  }

};
