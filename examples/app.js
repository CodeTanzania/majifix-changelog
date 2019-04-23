process.env.MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/majifix-changelogs';

/* dependencies */
const app = require('@lykmapipo/express-common');
const { connect, jsonSchema } = require('@lykmapipo/mongoose-common'); // eslint-disable-line
const { router, info, apiVersion } = require('../lib/index');

app.mount(router);

connect(connectionError => {
  if (connectionError) {
    throw connectionError;
  }

  app.get('/', (request, response) => {
    response.status(200);
    response.json(info);
  });

  app.get(`/${apiVersion}/schemas`, (request, response) => {
    const schema = jsonSchema();
    response.status(200);
    response.json(schema);
  });

  // fire the app
  app.start((error, env) => {
    if (error) {
      throw error;
    }
    console.log(`visit http://0.0.0.0:${env.PORT}/${apiVersion}/changelogs`);
  });
});
