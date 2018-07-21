/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  
  // var page = await Pages.create({
  //   idPage: '2083506518327974 ',
  //   namePage: 'SaulNavarrov',
  //   active: 'true',
  //   tokenPage: 'EAAFPdRVJsDoBAClzsa0N0RqrFCYqpcLdDKFNPn2XtTAoDYLwhZCocKO0ZBchlNpZC3CNr1DZA8cWYWhA4RjsYIpJPWHmhNjFxAq166I6ZCP1XRFob6HcJ6C95JWBjX51F69tRUOZBvtcX07Wa8bshrLSryaP0jT6x3JxHdV5yvU9p56UMOrAvW',
  //   typePage: 'Personal',
  // })
  // .fetch();
  
  // var client = await ClientsData.create({
  //   idfbs: '1703497029718211',
  //   first_name: 'Saúl',
  //   last_name: 'Navarrov',
  //   profile_pic: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?psid=1703497029718211&width=1024&ext=1532452683&hash=AeRbgHS_iJ17V-Vu',
  //   locale: 'es_LA',
  //   timezone: -5,
  //   gender: 'male',
  // })
  // .fetch();
  
  // var clientid = await ClientsId.create({
  //     datasclients: client.id,
  //     dataspages: page.id
  //   })
  //   .fetch();
  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
