// import app from '@lykmapipo/express-common';
import app from '@lykmapipo/express-common';
import _ from 'lodash';
import pkg from '../package.json';
import Changelog from './changelog.model';
import router from './http.router';

/* declarations */
const fields = [
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors',
];

/* extract information from package.json */
const info = _.merge({}, _.pick(pkg, fields));

/* extract api version from router version */
const apiVersion = router.version;

/* bind changelog router */
app.mount(router);

export { app, apiVersion, info, Changelog, router };
