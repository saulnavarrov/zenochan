# API Configuraciones De Messenger
--- 
Contiene todas las configuraciones del Archivo Controlador para mejorar la compatibilidad de **Zeno Chan Bot**
Para la hacer mucho mas funcionales los datos este trabajara con Async/Await
*Author:* Saúl Navarrov <Sinavarrov@gmail.com>

&nbsp;
&nbsp;
&nbsp;
## a)- PropertiesApiBotConfig (act, opt, tok)
---
Contiene las funciones para configurar el boot en las etapas iniciales
como el Boton de Starting, mensaje de bienvenida entre otras mas

### - Traer todas las propiedades activas 'get'

Trae todas propiedades
    
    await PropertiesApiBotConfig(act, opt, tok);

Ejemplo de como usar el codigo
    
    // Propiedades::  GET_STARTED, PERSISTENT_MENU, TARGET_AUDIENCE, WHITELISTED_DOMAINS, 
    //                GREETING, ACCOUNT_LINKING_URL, PAYMENT_SETTINGS, HOME_URL
    await PropertiesApiBotConfig('get',{
      all: true,
      fields: ''
    }, tok);
    
Trae una propiedad en Especifico o consjunto de propiedades, estas deben ser separada por comas ',' en la propiedad fields y la propiedad all cambia a false

    await PropertiesApiBotConfig('get',{
      all: false,
      fields: 'GETTINGS'
    }, tok);

*Propiedades*
    
    act: 'GET' Accion que se va a ejecutar 
    opt: JSON Conjunto de opciones
    tok: Token de la Pagina en Facebook

&nbsp;
### - Cofigura las Propiedades del Boot
Este es el codigo con el que se configuran muchas de las opciones del bot, como el boton de empezar o texto de bienvenida

Trae todas propiedades
    
    await PropertiesApiBotConfig(act, opt, tok);

**Ejemplo de como usar el codigo**

Configuración del boton de inicio

    // get_started
    // Configurar el Boton de Empezar
    // <Paiload> {String} Cadena de Texto que envia el la configuración
    // Code:
    await PropertiesApiBotConfig('set',{
      form: "get_started": {
          'payload': '<Paiload>'
        },
    }, tok);

Configuración del mensaje de bienvenida (Mensaje antes de Enviar mensaje o Presionar Empezar)

    // geeting
    // Configurarcion de Información de inicio
    // locale: "default" or "<Idioma>" ex: 'es_LA' 'en_US'
    // text: Texto que pondra en la pantalla de inicio
    // Variables:: {{user_first_name}} {{user_last_name}} {{user_full_name}}
    // Code:
    await PropertiesApiBotConfig('set',{
      form: "greeting":[{
        "locale":"default",
        "text":"Hola! {{user_first_name}}. ¿Dime en que puedo ayudarte?"
        }],
    }, tok);

    // Example Multi-idiomas:
    await PropertiesApiBotConfig('set',{
      form: "greeting":[{
        "locale":"default",
        "text":"Hello! {{user_first_name}}. ¿En que puedo ayudarte?"
      },{
        "locale":"en_US", 
        "text":"Hello! {{user_first_name}}. How can I help you?"
      }],
    }, tok);

lista de idiomas admitidos [Link](https://developers.facebook.com/docs/messenger-platform/messenger-profile/supported-locales)


&nbsp;
### - Eliminar una, varias o todas las Propiedades del Boot
Con este debemos eliminar todas las propiedades instauradas en el bot para que dejen de aparecer.

**Eliminar una propiedad**

    codigo aqui
    
**Eliminar varias propiedades**

    codigo aqui
    
**Eliminar todas las propiedades configuradas**
    
    codigo aqui
    



&nbsp;
&nbsp;
&nbsp;
## b)- DataProfileFb(opt)
---
Trae consigo los datos de los usuarios de facebook

###  Ejemplo del codigo

    // id: {string} <PSID> Id del Usuario
    // tokenPage: {string} Token generado de la pagina
    var buscarPerfil = await DataProfileFb({
     id: tokenSaulPruebas.client,
     tokenPage: tokenSaulPruebas.token
    })

**Retorno del código 200**
    
    [{
	    statusCode: 200,
	    success: true,
	    message: 'Id Profile Yes Found',
	    data: <Data Profile>
    }]

**Error:**

    [{
	    statusCode: {Number},
	    statusMessage: {string} ,
	    success: {boolean},
	    name: {string},
	    message: {string},
	    error: {JSON}
    }]


