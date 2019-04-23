import app from '@lykmapipo/express-common';
import {
  name,
  description,
  version,
  license,
  homepage,
  repository,
  bugs,
  contributors,
} from '../package.json';
import Changelog from './changelog.model';
import router from './http.router';

/* declarations */
const info = {
  name,
  description,
  version,
  license,
  homepage,
  repository,
  bugs,
  contributors,
};

/* extract api version from router version */
const apiVersion = router.version;

/* bind changelog router */
app.mount(router);

export { app, apiVersion, info, Changelog, router };
