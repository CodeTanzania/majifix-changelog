import app from '@lykmapipo/express-common';
import { pkg } from '@lykmapipo/common';
import Changelog from './changelog.model';
import router from './http.router';

/* declarations */
const info = pkg(
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
);

/* extract api version from router version */
const apiVersion = router.version;

/* bind changelog router */
app.mount(router);

export { app, apiVersion, info, Changelog, router };
