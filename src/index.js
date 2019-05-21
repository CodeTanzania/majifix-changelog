import { pkg } from '@lykmapipo/common';
import Changelog from './changelog.model';
import router from './http.router';

/* declarations */
const info = pkg(
  '../package.json',
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

export { apiVersion, info, Changelog, router };
