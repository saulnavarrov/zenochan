/**
 * Development.js
 * @description :: Archivo de configuración para el area de developments
 *
 */

module.exports = {

  /**************************************************************************
  *                                                                         *
  * Lift the server on port development                                     *
  * (if deploying behind a proxy, or to a PaaS like Heroku or Deis, you     *
  * probably don't need to set a port here, because it is oftentimes        *
  * handled for you automatically.  If you are not sure if you need to set  *
  * this, just try deploying without setting it and see if it works.)       *
  *                                                                         *
  ***************************************************************************/
  port: 33552,


  // Modelos
  models: {

    /***************************************************************************
     *                                                                          *
     * To help avoid accidents, Sails automatically sets the automigration      *
     * strategy to "safe" when your app lifts in production mode.               *
     * (This is just here as a reminder.)                                       *
     *                                                                          *
     * More info:                                                               *
     * https://sailsjs.com/docs/concepts/models-and-orm/model-settings#?migrate *
     *                                                                          *
     ***************************************************************************/
    migrate: 'safe',

    /***************************************************************************
     *                                                                          *
     * If, in production, this app has access to physical-layer CASCADE         *
     * constraints (e.g. PostgreSQL or MySQL), then set those up in the         *
     * database and uncomment this to disable Waterline's `cascadeOnDestroy`    *
     * polyfill.  (Otherwise, if you are using a databse like Mongo, you might  *
     * choose to keep this enabled.)                                            *
     *                                                                          *
     ***************************************************************************/
    // cascadeOnDestroy: false,

  },

  datastores: {

    /***************************************************************************
     *                                                                          *
     * Configure your default production database.                              *
     *                                                                          *
     * 1. Choose an adapter:                                                    *
     *    https://sailsjs.com/plugins/databases                                 *
     *                                                                          *
     * 2. Install it as a dependency of your Sails app.                         *
     *    (For example:  npm install sails-mysql --save)                        *
     *                                                                          *
     * 3. Then set it here (`adapter`), along with a connection URL (`url`)     *
     *    and any other, adapter-specific customizations.                       *
     *    (See https://sailsjs.com/config/datastores for help.)                 *
     *                                                                          *
     ***************************************************************************/
    default: {
      adapter: 'sails-mongo',
      // MLab
      url: 'mongodb://zenochansama:zen0Chan1028@ds131971.mlab.com:31971/zenochan',


      // url: 'mongodb://127.0.0.1:27017/dev_zeno_bot', // LOCAL


      // url: 'mongodb://Admin-Zeno_Sama:Zen0-1028*@ds123896.mlab.com:23896/zeno_chat_bot-sama',
      //--------------------------------------------------------------------------
      //  /\   To avoid checking it in to version control, you might opt to set
      //  ||   sensitive credentials like `url` using an environment variable.
      //
      //  For example:
      //  ```
      //  sails_datastores__default__url=mysql://admin:myc00lpAssw2D@db.example.com:3306/my_prod_db
      //  ```
      //--------------------------------------------------------------------------

      /****************************************************************************
       *                                                                           *
       * More adapter-specific options                                             *
       *                                                                           *
       * > For example, for some hosted PostgreSQL providers (like Heroku), the    *
       * > extra `ssl: true` option is mandatory and must be provided.             *
       *                                                                           *
       * More info:                                                                *
       * https://sailsjs.com/config/datastores                                     *
       *                                                                           *
       ****************************************************************************/
      ssl: false,

    },

  },



}
