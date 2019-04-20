/**
 * @apiDefine Changelog Changelog
 *
 * @apiDescription A record(log) of a changes on a service request(issue)
 *
 * It may be a status change, priority change, assignee change, private comment
 * (internal note) or public comment etc.
 *
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */

import { Router } from '@lykmapipo/express-common';
import { getString } from '@lykmapipo/env';
import _ from 'lodash';
import Changelog from './changelog.model';

/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_LIST = '/changelogs';
const PATH_SINGLE = '/changelogs/:id';
const PATH_SERVICEREQUEST = '/servicerequests/:servicerequest/changelogs';
const router = new Router({
  version: API_VERSION,
});

router.get(PATH_LIST, function getChangelogs(request, response, next) {
  // extract request options
  const options = _.merge({}, request.mquery);

  Changelog.get(options, function onGetChangelogs(error, results) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(results);
    }
  });
});

router.post(PATH_LIST, function postChangelog(request, response, next) {
  // extract request body
  const body = _.merge({}, request.body);

  Changelog.post(body, function onPostChangelog(error, created) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(created);
    }
  });
});

router.get(PATH_SINGLE, function getChangelog(request, response, next) {
  // extract request options
  const options = _.merge({}, request.mquery);

  // extract changelog id
  options._id = request.params.id; // eslint-disable-line

  Changelog.getById(options, function onGetChangelog(error, found) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(found);
    }
  });
});

router.patch(PATH_SINGLE, function patchChangelog(request, response, next) {
  // extract changelog id
  const { id } = request.params;

  // extract request body
  const patches = _.merge({}, request.body);

  Changelog.patch(id, patches, function onPatchChangelog(error, patched) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(patched);
    }
  });
});

router.put(PATH_SINGLE, function putChangelog(request, response, next) {
  // extract changelog id
  const { id } = request.params;

  // extract request body
  const updates = _.merge({}, request.body);

  Changelog.put(id, updates, function onPutChangelog(error, updated) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(updated);
    }
  });
});

router.delete(PATH_SINGLE, function deleteChangelog(request, response, next) {
  // extract changelog id
  const { id } = request.params;

  Changelog.del(id, function onDeleteChangelog(error, deleted) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(deleted);
    }
  });
});

router.get(PATH_SERVICEREQUEST, function getChangelogs(
  request,
  response,
  next
) {
  // extract request options
  const { servicerequest } = request.params;
  const filter = servicerequest ? { filter: { request: servicerequest } } : {};
  const options = _.merge({}, filter, request.mquery);

  Changelog.get(options, function onGetChangelogs(error, found) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(found);
    }
  });
});

export default router;
