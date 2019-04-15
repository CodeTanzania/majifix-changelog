/**
 * @module Changelog
 * @name Changelog
 * @description A record(log) of a changes on a service request(issue).
 *
 *              It may be status change, priority change, assignee change,
 *              private comment(internal note) or public comment etc.
 *
 * @see {@link ServiceRequest}
 * @see {@link Status}
 * @see {@link Party}
 * @see {@link Priority}
 * @author lally elias <lallyelias87@gmail.com>
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */

import mongoose, { Schema } from 'mongoose';
import { Status } from '@codetanzania/majifix-status';
import { Priority } from '@codetanzania/majifix-priority';
import { models } from '@codetanzania/majifix-common';
import actions from 'mongoose-rest-actions';
import async from 'async';
import _ from 'lodash';

/* contants */
const { ObjectId } = Schema.Types;
const VISIBILITY_PUBLIC = 'Public';
const VISIBILITY_PRIVATE = 'Private';
const VISIBILITIES = [VISIBILITY_PRIVATE, VISIBILITY_PUBLIC];
const SCHEMA_OPTIONS = { timestamps: true, emitIndexError: true };
const { CHANGELOG_MODEL_NAME, SERVICEREQUEST_MODEL_NAME } = models;

/**
 * @name ChangelogSchema
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const ChangelogSchema = new Schema(
  {
    /**
     * @name request
     * @description Associated service request(issue)
     * @type {ServiceRequest}
     * @see {@link ServiceRequest}
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    request: {
      type: ObjectId,
      ref: SERVICEREQUEST_MODEL_NAME,
      required: true,
      index: true,
      exists: true,
      hidden: true,
      autopopulate: {
        select: 'code',
        maxDepth: 1,
      },
    },

    /**
     * @name status
     * @description A current assigned status of the service request.
     *
     * @type {object}
     * @property {object} type - Schema(data) type
     * @property {string} ref - referenced collection
     * @property {boolean} autoset - allow to set id from full object
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - status population options
     * @property {boolean} index - ensure database index
     * @see {@link Status}
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    status: {
      type: ObjectId,
      ref: Status.MODEL_NAME,
      index: true,
      autoset: true,
      exists: true,
      autopopulate: Status.OPTION_AUTOPOPULATE,
    },

    /**
     * @name priority
     * @description A current assigned priority of the service request
     *
     * @type {object}
     * @property {object} type - Schema(data) type
     * @property {string} ref - referenced collection
     * @property {boolean} autoset - allow to set id from full object
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - priority population options
     * @property {boolean} index - ensure database index
     * @see {@link Priority}
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    priority: {
      type: ObjectId,
      ref: Priority.MODEL_NAME,
      index: true,
      autoset: true,
      exists: true,
      autopopulate: Priority.OPTION_AUTOPOPULATE,
    },

    /**
     * @name assignee
     * @description A current assigned party to work on service request(issue)
     * @type {Party}
     * @see {@link Priority}
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    assignee: {
      type: ObjectId,
      ref: 'Party',
      index: true,
      exists: true,
      autopopulate: {
        select: 'name email phone',
        maxDepth: 1,
      },
    },

    /**
     * @name changer
     * @description A party who made changes to a servie request(issue)
     * @type {Object}
     * @see {@link Party}
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    changer: {
      type: ObjectId,
      ref: 'Party',
      index: true,
      exists: true,
      autopopulate: {
        select: 'name email phone',
        maxDepth: 1,
      },
    },

    /**
     * @name comment
     * @description A note provided by a change when changing a status.
     *
     *              It may be an internal note telling how far the service
     *              request(issue) has been worked on or a message to a reporter.
     *
     * @type {object}
     * @property {object} type - Schema(data) type
     * @property {boolean} trim - ensure trimming
     * @property {boolean} searchable - allow for searching
     * @property {boolean} index - ensure database index
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    comment: {
      type: String,
      index: true,
      trim: true,
      searchable: true,
    },

    /**
     * @name resolvedAt
     * @description Latest time when the service request(issue) was resolved.
     * @type {Object}
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    resolvedAt: {
      type: Date,
      index: true,
    },

    /**
     * @name reopenedAt
     * @description Latest time when the service request(issue) was reopened.
     * @type {Object}
     * @private
     * @since 0.1.0
     * @version 0.1.0
     */
    reopenedAt: {
      type: Date,
      index: true,
    },

    /**
     * @name shouldNotify
     * @description Signal to send notification to a service request(issue)
     *              reporter using sms, email etc. about work(progress) done
     *              so far to resolve the issue.
     *
     * @type {object}
     * @property {object} type - Schema(data) type
     * @property {boolean} default - default value
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    shouldNotify: {
      type: Boolean,
      default: false,
    },

    /**
     * @name wasNotificationSent
     * @description Tells if a notification contain a changes was
     *              sent to a service request(issue) reporter using
     *              sms, email etc. once a service request changed.
     *
     *              Note!: status changes trigger a notification to be sent
     *              always.
     *
     * @type {object}
     * @property {object} type - Schema(data) type
     * @property {boolean} default - default value
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    wasNotificationSent: {
      type: Boolean,
      default: false,
    },

    /**
     * @name visibility
     * @description Signal if this changelog is public or private viewable.
     *
     *              Note!: status changes are always public viewable by default.
     *
     * @type {object}
     * @property {object} type - Schema(data) type
     * @property {string} default - default value it('should have wasNotificationSent field');
     * @property {array} enum - list of acceptable values
     * @property {boolean} index - ensure database index
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    visibility: {
      type: String,
      index: true,
      enum: VISIBILITIES,
      default: VISIBILITY_PRIVATE,
    },
  },
  SCHEMA_OPTIONS
);

/*
 * ----------------------------------------------------------------------------
 *  Changelog schema hooks
 * ----------------------------------------------------------------------------
 */

/**
 * @name  preValidate
 * @description pre validation logics for changelog
 * @param  {Function} next a callback to be called after pre validation logics
 * @since  0.1.0
 * @version 0.1.0
 * @private
 */
ChangelogSchema.pre('validate', next => {
  // always make status change to trigger notification and public viewable
  if (this.status) {
    this.shouldNotify = true;
    this.visibility = VISIBILITY_PUBLIC;
  }

  next();
});

/*
 * ----------------------------------------------------------------------------
 *  Virtuals
 * ----------------------------------------------------------------------------
 */

/**
 * @name isPublic
 * @description check if current change log is public visible
 * @type {Boolean}
 * @since 0.1.0
 * @version 0.1.0
 */
ChangelogSchema.virtual('isPublic').get(function isPublicVisible() {
  const isPublic = this.visibility === VISIBILITY_PUBLIC;
  return isPublic;
});

/*
 * ----------------------------------------------------------------------------
 *  Instance
 * ----------------------------------------------------------------------------
 */

/*
 * ----------------------------------------------------------------------------
 *  Changelog schema Statics
 * ----------------------------------------------------------------------------
 */

/* expose changlog visibility flags(contants) */
ChangelogSchema.statics.VISIBILITY_PUBLIC = VISIBILITY_PUBLIC;
ChangelogSchema.statics.VISIBILITY_PRIVATE = VISIBILITY_PRIVATE;
ChangelogSchema.statics.VISIBILITIES = VISIBILITIES;
ChangelogSchema.statics.MODEL_NAME = CHANGELOG_MODEL_NAME;

/**
 * @name track
 * @type Function
 * @description track service request changelogs
 * @param {Object} changes service request latest changes
 * @param {ObjectId} changes.request valid existing service request object id
 * @param {Function} done a callback to invoke on success or failure
 * @return {Object} latest service request
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 */
ChangelogSchema.statics.track = function track(changes, done) {
  // ensure changelog
  let changelog = _.merge({}, changes);

  if (!changelog.request) {
    const error = new Error('Missing Service Request Id');
    error.status = 400;
    return done(error);
  }

  // refs
  const ServiceRequest = mongoose.model(SERVICEREQUEST_MODEL_NAME);

  return async.waterfall(
    [
      // obtain service requrests
      function findServiceRequest(next) {
        ServiceRequest.findById(changelog.request)
          .orFail(() => {
            const error = new Error('Service Request Not Found');
            error.status = 404;
            return error;
          })
          .exec(next);
      },

      // resolve or reopen
      function resolveOrReopen(request, next) {
        const serviceRequest = request;
        // check resolvedAt
        if (_.has(changelog, 'resolvedAt')) {
          // clear or set resolve time
          serviceRequest.resolvedAt = changelog.resolvedAt;

          if (!changelog.resolvedAt) {
            // clear resolve time
            serviceRequest.ttr = undefined;

            // set reopen time
            const reopenedAt = new Date();
            serviceRequest.reopenedAt = reopenedAt;
            changelog.reopenedAt = reopenedAt;
          }
        }

        next(undefined, serviceRequest);
      },

      // compute changes
      function computeChanges(serviceRequest, next) {
        // compact changelog
        changelog = _.omitBy(changelog, value => {
          return _.isUndefined(value) || _.isNull(value);
        });

        // compute changelog
        let changelogs = serviceRequest.changes(changelog);
        changelogs = [].concat(serviceRequest.changelogs).concat(changelogs);

        // persists changes
        this.create(changelogs, error => {
          next(error, serviceRequest);
        });
      }.bind(this),

      // update service request
      function updateServiceRequest(serviceRequest, next) {
        // update
        _.forEach(changelog, (value, key) => {
          serviceRequest.set(key, value);
        });

        serviceRequest.save(error => {
          next(error, serviceRequest);
        });
      },

      // reload service request
      function reload(serviceRequest, next) {
        ServiceRequest.findById(changelog.request).exect(next);
      },
    ],
    done
  );
};

/*
 * ----------------------------------------------------------------------------
 *  Plugins
 * ----------------------------------------------------------------------------
 */

/* use mongoose rest actions */
ChangelogSchema.plugin(actions);

/* export changelog model */
export default mongoose.model(CHANGELOG_MODEL_NAME, ChangelogSchema);
