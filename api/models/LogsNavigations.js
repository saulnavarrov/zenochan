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
      
    /*  'xrealip': {
        type: '',
        defaultsto: '',
        description: ''
      },
      // req.headers['x-real-ip'],
      
      'xforwardedproto': {
        type: '',
        defaultsto: '',
        description: ''
      },
      // req.headers['x-forwarder-proto'],
      
      'host': {
        type: '',
        defaultsto: '',
        description: ''
      },
      // req.headers['host'],
      
      'url': {
        type: '',
        defaultsto: '',
        description: ''
      },
      // req.url,
      
      'userAgent': {
        type: '',
        defaultsto: '',
        description: ''
      },
      // req.headers['user-agent'],
      
      'method': {
        type: '',
        defaultsto: '',
        description: ''
      },
      // req.method,
      
      'complete': {
        type: '',
        defaultsto: '',
        description: ''
      },
      // req.complete,
      
      'opController': {
        type: '',
        defaultsto: '',
        description: ''
      },
      // req.options['controller'],
      
      'opAction': {
        type: '',
        defaultsto: '',
        description: ''
      },
      // req.options.action,
      
      'xnginxproxy': {
        type: '',
        defaultsto: '',
        description: ''
      },
      // req.headers['x-nginx-proxy'],
      
      'connection': {
        type: '',
        defaultsto: '',
        description: ''
      },
      // req.headers['connection'],
      
      'cacheControl': {
        type: '',
        defaultsto: '',
        description: ''
      },
      // req.headers['cache-control'],
      
      'xHubSignature': {
        type: '',
        defaultsto: '',
        description: ''
      },
      // req.headers['x-hub-signature'],
      
      'acceptEncoding': {
        type: '',
        defaultsto: '',
        description: ''
      },
      // req.headers['accept-encoding'],
      
      'acceptLanguage': {
        type: '',
        defaultsto: '',
        description: ''
      },
      // req.headers['accept-lenguage'] || req.i18n.locale,
      
      'locale': {
        type: '',
        defaultsto: '',
        description: ''
      },
      // req.i18n.locale,
      
      'cookie': {
        type: '',
        defaultsto: '',
        description: ''
      },
      // req.headers['cookie'],
      
      'ifNoneMatch': {
        type: '',
        defaultsto: '',
        description: ''
      },
      // req.headers['if-none-match'],
      
      'user': {
        type: '',
        defaultsto: '',
        description: ''
      },
      // user === undefined ? 'Guest' : user.auth.id,
      
      country: {
        type: '',
        defaultsto: '',
        description: ''
      },
      ctry: {
        type: '',
        defaultsto: '',
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

