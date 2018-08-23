/**
 * LogsNavigations.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  schema: false,
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    cntry: {
      type: 'String',
      defaultsTo: '?',
      description: 'Abreviación de que pais se conecta la persona'
    },
    
     'xforwarderfor': {
       type: 'String',
       defaultsTo: 'NoIP',
       description: 'Ip de la persona que se conecta'
     },
      // req.headers["x-forwarder-for"],
      
    'xrealip': {
      type: 'String',
      defaultsTo: 'NoIP',
      description: 'Ip de la persona que se conecta'
    },
      // req.headers['x-real-ip'],
      
    /*  'xforwardedproto': {
        type: '',
        defaultsTo: '',
        description: ''
      },
      // req.headers['x-forwarder-proto'],
      
      'host': {
        type: '',
        defaultsTo: '',
        description: ''
      },
      // req.headers['host'],
      
      'url': {
        type: '',
        defaultsTo: '',
        description: ''
      },
      // req.url,
      
      'userAgent': {
        type: '',
        defaultsTo: '',
        description: ''
      },
      // req.headers['user-agent'],
      
      'method': {
        type: '',
        defaultsTo: '',
        description: ''
      },
      // req.method,
      
      'complete': {
        type: '',
        defaultsTo: '',
        description: ''
      },
      // req.complete,
      
      'opController': {
        type: '',
        defaultsTo: '',
        description: ''
      },
      // req.options['controller'],
      
      'opAction': {
        type: '',
        defaultsTo: '',
        description: ''
      },
      // req.options.action,
      
      'xnginxproxy': {
        type: '',
        defaultsTo: '',
        description: ''
      },
      // req.headers['x-nginx-proxy'],
      
      'connection': {
        type: '',
        defaultsTo: '',
        description: ''
      },
      // req.headers['connection'],
      
      'cacheControl': {
        type: '',
        defaultsTo: '',
        description: ''
      },
      // req.headers['cache-control'],
      
      'xHubSignature': {
        type: '',
        defaultsTo: '',
        description: ''
      },
      // req.headers['x-hub-signature'],
      
      'acceptEncoding': {
        type: '',
        defaultsTo: '',
        description: ''
      },
      // req.headers['accept-encoding'],
      
      'acceptLanguage': {
        type: '',
        defaultsTo: '',
        description: ''
      },
      // req.headers['accept-lenguage'] || req.i18n.locale,
      
      'locale': {
        type: '',
        defaultsTo: '',
        description: ''
      },
      // req.i18n.locale,
      
      'cookie': {
        type: '',
        defaultsTo: '',
        description: ''
      },
      // req.headers['cookie'],
      
      'ifNoneMatch': {
        type: '',
        defaultsTo: '',
        description: ''
      },
      // req.headers['if-none-match'],
      
      'user': {
        type: '',
        defaultsTo: '',
        description: ''
      },
      // user === undefined ? 'Guest' : user.auth.id,
      
      country: {
        type: '',
        defaultsTo: '',
        description: ''
      },
      ctry: {
        type: '',
        defaultsTo: '',
        description: ''
      },
      
     */

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    ipsl: {
      model: 'ipslocations'
    }
  },

};

