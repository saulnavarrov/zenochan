/**
 * WordList.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'wordList',
  schema: true,
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    
    // Palabra en string
    palabra: {
      type: 'string',
      unique: true,
      required: true,
    },

    // Idioma de la palabra
    idioma: {
      type: 'string',
      defaultsTo: '?'
    },

    // Peso de la palabras
    peso: {
      type: 'number',
      columnType: 'fload',
      defaultsTo: 0      
    },

    hexa: {
      type: 'json',
      // columnType: 'array',
      defaultsTo: ['00'],
    },

    decs: {
      type: 'json',
      // columnType: 'array',
      defaultsTo: [0],
    },
    
    // Sentimientos negativos on positivos
    sentimientos: {
      type: 'json',
      // columnType: 'array',
      defaultsTo: ['00'],
    },// '',
    
    // Pequeño acto que se realiza durante las acciones
    accion: {
      type: 'string',
      defaultsTo: '',
    },// '',
    
    // Palabra si es la correcta o no
    correcta: {
      type: 'boolean',
      defaultsTo: false
    },// true,
    
    // Cuantas veces ha sido usada la palabra
    usada: {
      type: 'number',
      defaultsTo: 0
    },// 0,
    
    // es verificado si es una palabra
    verbo: {
      type: 'string',
      defaultsTo: ''
    },// '',
    
    // Que tipo de verbo es
    verboTipo: {
      type: 'string',
      defaultsTo: ''
    },// '',

    // Detectara si la palabra es un nombre o apellidos
    wordIsName: {
      type: 'boolean',
      defaultsTo: false,
    },
    
    // Detecta si es una palabra
    nombre: {
      type: 'string',
      defaultsTo: ''
    },// '',
    
    // Detecta si la palabra que se dicta es un apellido
    wordIsLastName: {
      type: 'boolean',
      defaultsTo: false,
    },

    // Detecta si es un apellido
    apellido: {
      type: 'string',
    },// '',
    
    // Si es un numero  o no en letras y simbolo
    numero: {
      type: 'string',
    },// '',
    
    // Thema en general, de una conversación, o palabra claves de un thema
    themas: {
      type: 'string',
    },// [],
    
    // Se categoriza si es una groseria o no
    groseria: {
      type: 'boolean',
      defaultsTo: false,
    },// '',
    
    // tarea que se realiza por un momento como conducir, limpiar (verbos)
    acciones: {
      type: 'string',
    },// '',
    
    // Grupo de acciones realizadas para un resultado comun,
    tarea: {
      type: 'string',
    },// '',
    
    // Tamaño de la palabras en carapteres ej; hola = 4
    size: {
      type: 'number',
    },// palabra.length,
    
    // ID de la palabra que es correcta.
    idCorrecta: {
      type: 'string',
    },// '',


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

