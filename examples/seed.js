/* dependencies */
const _ = require('lodash');
const { waterfall } = require('async');
const { connect } = require('@lykmapipo/mongoose-common'); // eslint-disable-line
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction'); // eslint-disable-line
const { Priority } = require('@codetanzania/majifix-priority');
const { Status } = require('@codetanzania/majifix-status');
const { ServiceGroup } = require('@codetanzania/majifix-service-group'); // eslint-disable-line
const { Service } = require('@codetanzania/majifix-service'); // eslint-disable-line
const { ServiceRequest } = require('@codetanzania/majifix-service-request');
const { Changelog } = require('../lib');

/* track seeding time */
let seedStart;
let seedEnd;

/* eslint-disable */
const log = (stage, error, results) => {
  if (error) {
    console.error(`${stage} seed error`, error);
  }

  if (results) {
    const val = _.isArray(results) ? results.length : results;
    console.info(`${stage} seed result`, val);
  }
};
/* eslint-enable */

connect(err => {
  if (err) {
    throw err;
  }

  waterfall(
    [
      function clearChangelogs(next) {
        Changelog.deleteMany(() => next());
      },

      function clearServiceRequests(next) {
        ServiceRequest.deleteMany(() => next());
      },

      function clearServiceServices(next) {
        Service.deleteMany(() => next());
      },

      function clearServiceGroups(next) {
        ServiceGroup.deleteMany(() => next());
      },

      function clearPriorities(next) {
        Priority.deleteMany(() => next());
      },

      function clearStatuses(next) {
        Status.deleteMany(() => next());
      },

      function clearJurisdictions(next) {
        Jurisdiction.deleteMany(() => next());
      },

      function seedJurisdiction(next) {
        const jurisdiction = Jurisdiction.fake();
        jurisdiction.post(next);
      },

      function seedPriority(jurisdiction, next) {
        const priority = Priority.fake();
        priority.jurisdiction = jurisdiction;
        priority.post((error, created) => {
          next(error, jurisdiction, created);
        });
      },

      function seedStatus(jurisdiction, priority, next) {
        const status = Status.fake();
        status.jurisdiction = jurisdiction;
        status.post((error, created) => {
          next(error, jurisdiction, priority, created);
        });
      },

      function seedServiceGroup(jurisdiction, priority, status, next) {
        const group = ServiceGroup.fake();
        group.jurisdiction = jurisdiction;
        group.post((error, created) => {
          next(error, jurisdiction, priority, status, created);
        });
      },

      function seedService(jurisdiction, priority, status, group, next) {
        const service = Service.fake();
        service.jurisdiction = jurisdiction;
        service.group = group;
        service.priority = priority;

        service.post((error, created) => {
          next(error, jurisdiction, priority, status, group, created);
        });
      },

      function seedServiceRequest(
        jurisdiction,
        priority,
        status,
        group,
        service,
        next
      ) {
        const serviceRequest = ServiceRequest.fake();

        serviceRequest.jurisdiction = jurisdiction;
        serviceRequest.priority = priority;
        serviceRequest.status = status;
        serviceRequest.group = group;
        serviceRequest.service = service;

        serviceRequest.post((error, created) => {
          next(error, jurisdiction, priority, status, group, service, created);
        });
      },

      function seedChangelogs(
        jurisdiction,
        priority,
        status,
        group,
        service,
        serviceRequest,
        next
      ) {
        seedStart = Date.now();
        let changelogs = Changelog.fake(50);

        changelogs = _.map(changelogs, changelog => {
          const sample = changelog;
          sample.request = serviceRequest;
          sample.group = group;
          sample.status = status;
          return sample;
        });

        Changelog.create(changelogs, next);
      },
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      seedEnd = Date.now();

      log('time', null, seedEnd - seedStart);
      log('final', error, results);
      process.exit(0);
    }
  );
});
