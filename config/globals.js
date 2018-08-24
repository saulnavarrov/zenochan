/**
 * Global Variable Configuration
 * (sails.config.globals)
 *
 * Configure which global variables which will be exposed
 * automatically by Sails.
 *
 * For more information on any of these options, check out:
 * https://sailsjs.com/config/globals
 */

module.exports.globals = {

  /** *************************************************************************
   *            CONTROLADORES GLOBALES DE LA APP DE USO INTERNO
   * 
   * Estos controladores se ulitizaran para ser llamados por otros controladores
   * en o desde cualquier parte de la app, para evitar llamadas contantes a 
   * controladores de manera redundante
   * *************************************************************************/
  // IpGeosC: require('../api/controllers/IpGeosController'),
  controllers: true,

  /****************************************************************************
  *                                                                           *
  * Whether to expose the locally-installed Lodash as a global variable       *
  * (`_`), making  it accessible throughout your app.                         *
  * (See the link above for help.)                                            *
  *                                                                           *
  ****************************************************************************/

  _: require('@sailshq/lodash'),

  /****************************************************************************
  *                                                                           *
  * Whether to expose the locally-installed `async` as a global variable      *
  * (`async`), making it accessible throughout your app.                      *
  * (See the link above for help.)                                            *
  *                                                                           *
  ****************************************************************************/

  async: require('async'),

  /****************************************************************************
  *                                                                           *
  * Whether to expose each of your app's models as global variables.          *
  * (See the link at the top of this file for more information.)              *
  *                                                                           *
  ****************************************************************************/

  models: true,

  /****************************************************************************
  *                                                                           *
  * Whether to expose the Sails app instance as a global variable (`sails`),  *
  * making it accessible throughout your app.                                 *
  *                                                                           *
  ****************************************************************************/

  sails: true,

};
