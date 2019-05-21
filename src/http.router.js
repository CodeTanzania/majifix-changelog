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

/**
 * @apiDefine Changelog
 * @apiSuccess {String} _id Unique status identifier
 * @apiSuccess {Object} request
 * @apiSuccess {String} request.code Service Request code
 * @apiSuccess {String} request._id Unique Service Request identifier
 * @apiSuccess {Object} status Status change associated with changelog
 * @apiSuccess {String} status.name.en Status name in english locale
 * @apiSuccess {String} status.color Status color
 * @apiSuccess {String} status._id Unique Status identifier
 * @apiSuccess {Object} priority Priority change associate with changelog
 * @apiSuccess {String} priority.name.en Priority name in english locale
 * @apiSuccess {String} priority.color Priority color
 * @apiSuccess {String} comment A note provided by a change when changing a status
 * @apiSuccess {bool} shouldNotify Signal to send notification to a service request(issue)
 *                                 reporter using sms, email etc. about work(progress) done
 *                                 so far to resolve the issue.
 * @apiSuccess {bool} wasNotificaitonSent Tells if a notification contain a changes was
 *                                        sent to a service request(issue) reporter using
 *                                        sms, email etc. once a service request changed.
 * @apiSuccess {Date} createdAt Date when status was created
 * @apiSuccess {Date} updatedAt Date when status was last updated
 */

/**
 * @apiDefine Changelogs
 * @apiSuccess {Object[]} data list of changelogs
 * @apiSuccess {String} data._id Unique status identifier
 * @apiSuccess {Object} data.request
 * @apiSuccess {String} data.request.code Service Request code
 * @apiSuccess {String} data.request._id Unique Service Request identifier
 * @apiSuccess {Object} data.status Status change associated with changelog
 * @apiSuccess {String} data.status.name.en Status name in english locale
 * @apiSuccess {String} data.status.color Status color
 * @apiSuccess {String} data.status._id Unique Status identifier
 * @apiSuccess {Object} data.priority Priority change associate with changelog
 * @apiSuccess {String} data.priority.name.en Priority name in english locale
 * @apiSuccess {String} data.priority.color Priority color
 * @apiSuccess {String} data.comment A note provided by a change when changing a status
 * @apiSuccess {bool} data.shouldNotify Signal to send notification to a service request(issue)
 *                                 reporter using sms, email etc. about work(progress) done
 *                                 so far to resolve the issue.
 * @apiSuccess {bool} data.wasNotificaitonSent Tells if a notification contain a changes was
 *                                        sent to a service request(issue) reporter using
 *                                        sms, email etc. once a service request changed.
 
 * @apiSuccess {Date} data.createdAt Date when changelog was created
 * @apiSuccess {Date} data.updatedAt Date when changelog was last updated
 * @apiSuccess {Number} total Total number of changelog
 * @apiSuccess {Number} size Number of changelogs returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 * @apiSuccess {Date} lastModified Date and time at which latest changelog
 * was last modified
 */

/**
 * @apiDefine ChangelogSuccessResponse
 * @apiSuccessExample {json} Success-Response
 *  {
 *    "request": {
 *        "code": "39375323",
 *        "_id": "5cc0698c22d2af55680e1373"
 *      },
 *      "status": {
 *      "name": {
 *        "en": "Generic Frozen Chicken",
 *        "sw": "Tasty Rubber Soap"
 *      },
 *      "color": "#47C10F",
 *      "_id": "5cc0698c22d2af55680e1366"
 *    },
 *    "priority": {
 *      "name": {
 *        "en": "Tasty Wooden Keyboard",
 *        "sw": "Sleek Granite Keyboard"
 *      },
 *      "color": "#DDC0F7",
 *      "_id": "5cc0698c22d2af55680e1364"
 *    },
 *    "comment": "Caleb Beer",
 *    "shouldNotify": true,
 *    "wasNotificationSent": false,
 *    "visibility": "Public",
 *    "_id": "5cc0698c22d2af55680e1387",
 *    "updatedAt": "2019-04-24T13:50:05.235Z",
 *    "createdAt": "2019-04-24T13:50:05.235Z"
 * }
 */

/**
 * @apiDefine ChangelogsSuccessResponse
 * @apiSuccessExample {json} Success-Response
 * {
 *   "data":[
 *      {
 *         "request": {
 *             "code": "39375323",
 *             "_id": "5cc0698c22d2af55680e1373"
 *           },
 *           "status": {
 *           "name": {
 *             "en": "Generic Frozen Chicken",
 *             "sw": "Tasty Rubber Soap"
 *           },
 *           "color": "#47C10F",
 *           "_id": "5cc0698c22d2af55680e1366"
 *         },
 *         "priority": {
 *           "name": {
 *             "en": "Tasty Wooden Keyboard",
 *             "sw": "Sleek Granite Keyboard"
 *           },
 *           "color": "#DDC0F7",
 *           "_id": "5cc0698c22d2af55680e1364"
 *         },
 *         "comment": "Caleb Beer",
 *         "shouldNotify": true,
 *         "wasNotificationSent": false,
 *         "visibility": "Public",
 *         "_id": "5cc0698c22d2af55680e1387",
 *         "updatedAt": "2019-04-24T13:50:05.235Z",
 *         "createdAt": "2019-04-24T13:50:05.235Z"
 *      }
 *   ],
 *  "total": 10,
 *   "size": 2,
 *   "limit": 2,
 *   "skip": 0,
 *   "page": 1,
 *   "pages": 5,
 *   "lastModified": "2018-05-06T10:19:04.910Z"
 * }
 */

/**
 * @apiDefine JWTError
 * @apiError  JWTExpired Authorization token has expired
 */

/**
 * @apiDefine AuthorizationHeaderError
 * @apiError  AuthorizationHeaderRequired  Authorization header is required
 */

/**
 * @apiDefine AuthorizationHeaderErrorExample
 * @apiErrorExample   {json} Error-Response:
 *    HTTP/1.1 403 Forbidden
 *    {
 *      "success":false,
 *      "message :"Authorization header required",
 *      "error":{}
 *    }
 */

/**
 * @apiDefine JWTErrorExample
 * @apiErrorExample  {json}   Error-Response:
 *    HTTP/1.1 403 Forbidden
 *    {
 *      "success":false,
 *      "message :"jwt expired",
 *      "error":{}
 *    }
 */

/**
 * @apiDefine ChangelogRequestHeader
 * @apiHeader {String} [Accept=application/json] Accepted content type
 * @apiHeader {String} Authorization Authorization token
 * @apiHeader {String} [Accept-Encoding='gzip, deflate'] Accepted encoding type
 */

/**
 * @apiDefine ChangelogRequestHeaderExample
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     "Accept": "application/json"
 *     "Authorization": "Bearer ey6utFreRdy5"
 *     "Accept-Encoding": "gzip, deflate"
 *   }
 */

/* dependencies */
import { getString } from '@lykmapipo/env';
import { Router } from '@lykmapipo/express-common';
import _ from 'lodash';
import Changelog from './changelog.model';

/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_LIST = '/servicerequests/:servicerequest/changelogs';
const PATH_SINGLE = '/servicerequests/:servicerequest/changelogs/:id';
const router = new Router({
  version: API_VERSION,
});

/**
 * @api {get} /servicerequests/:servicerequest/changelogs List Changelogs
 * @apiVersion 0.1.0
 * @apiName GetChangelogs
 * @apiGroup Changelog
 * @apiDescription Returns a list of service requests changelogs
 * @apiUse ChangelogRequestHeader
 * @apiUse Changelogs
 *
 * @apiExample {curl} curl:
 *    curl -i https://majifix-changelog.herokuapp.com/v1/changelogs
 *
 * @apiUse ChangelogRequestHeaderExample
 * @apiUse ChangelogsSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_LIST, function getChangelogs(request, response, next) {
  // extract request options
  const { servicerequest } = request.params;
  const filter = servicerequest ? { filter: { request: servicerequest } } : {};
  const options = _.merge({}, filter, request.mquery);

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

/**
 * @api {post} /servicerequests/:servicerequest/changelogs Create new Changelog
 * @apiVersion 0.1.0
 * @apiName PostChangelogs
 * @apiGroup Changelog
 * @apiDescription Create a new ServiceRequest Changelog
 * @apiUse ChangelogRequestHeader
 * @apiUse Changelog
 *
 * @apiExample {curl} curl:
 *    curl -i https://majifix-changelog.herokuapp.com/v1/changelogs
 *
 * @apiUse ChangelogRequestHeaderExample
 * @apiUse ChangelogsSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.post(PATH_LIST, function postChangelog(request, response, next) {
  // extract request body
  const { servicerequest } = request.params;
  const body = _.merge({}, request.body, { request: servicerequest });

  Changelog.post(body, function onPostChangelog(error, created) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(201);
      response.json(created);
    }
  });
});

/**
 * @api {get} /servicerequests/:servicerequest/changelogs Get existing Changelog
 * @apiVersion 0.1.0
 * @apiName GetChangelog
 * @apiGroup Changelog
 * @apiDescription Returns existing service request with given :id
 * @apiUse ChangelogRequestHeader
 * @apiUse Changelog
 *
 * @apiExample {curl} curl:
 *    curl -i https://majifix-changelog.herokuapp.com/v1/changelogs
 *
 * @apiUse ChangelogRequestHeaderExample
 * @apiUse ChangelogsSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
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

/**
 * @api {patch} /servicerequests/:servicerequest/changelogs/:id  Patch existing Changelog
 * @apiVersion 0.1.0
 * @apiName PatchChangelog
 * @apiGroup Changelog
 * @apiDescription Patch existing changelog
 * @apiUse ChangelogRequestHeader
 * @apiUse Changelog
 *
 * @apiExample {curl} curl:
 *    curl -i https://majifix-changelog.herokuapp.com/v1/changelogs
 *
 * @apiUse ChangelogRequestHeaderExample
 * @apiUse ChangelogsSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
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

/**
 * @api {put} /servicerequests/:servicerequest/changelogs/:id Put existing Changelog
 * @apiVersion 0.1.0
 * @apiName PutChangelog
 * @apiGroup Changelog
 * @apiDescription Put existing changelog
 * @apiUse ChangelogRequestHeader
 * @apiUse Changelog
 *
 * @apiExample {curl} curl:
 *    curl -i https://majifix-changelog.herokuapp.com/v1/changelogs
 *
 * @apiUse ChangelogRequestHeaderExample
 * @apiUse ChangelogsSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
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

/**
 * @api {delete} /servicerequests/:servicerequest/changelogs/:id  Delete existing Changelog
 * @apiVersion 0.1.0
 * @apiName DeleteChangelog
 * @apiGroup Changelog
 * @apiDescription Delete existing changelog
 * @apiUse ChangelogRequestHeader
 * @apiUse Changelog
 *
 * @apiExample {curl} curl:
 *    curl -i https://majifix-changelog.herokuapp.com/v1/changelogs
 *
 * @apiUse ChangelogRequestHeaderExample
 * @apiUse ChangelogsSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
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

export default router;
