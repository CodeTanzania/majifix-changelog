import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { Priority } from '@codetanzania/majifix-priority';
import { Service } from '@codetanzania/majifix-service';
import { ServiceGroup } from '@codetanzania/majifix-service-group';
import { ServiceRequest } from '@codetanzania/majifix-service-request';
import { Status } from '@codetanzania/majifix-status';
import { clear, create } from '@lykmapipo/mongoose-test-helpers';
import { expect } from 'chai';
import _ from 'lodash';
import { Changelog } from '../../src/index';

describe('Changelog', () => {
  const jurisdiction = Jurisdiction.fake();
  const serviceGroup = ServiceGroup.fake();
  const status = Status.fake();
  const priority = Priority.fake();

  const service = Service.fake();
  service.group = serviceGroup;

  const serviceRequest = ServiceRequest.fake();
  let changelogs;

  before(done => create(jurisdiction, serviceGroup, status, priority, done));

  before(done => create(service, done));

  before(done => {
    serviceRequest.jurisdiction = jurisdiction;
    serviceRequest.group = serviceGroup;
    serviceRequest.service = service;
    serviceRequest.priority = priority;
    serviceRequest.status = status;
    create(serviceRequest, done);
  });

  before(done => {
    changelogs = Changelog.fake(32);

    changelogs = _.map(changelogs, log => {
      const changelog = log;
      changelog.request = serviceRequest;
      changelog.priority = priority;
      changelog.status = status;
      return changelog;
    });

    create(...changelogs, done);
  });

  describe('get', () => {
    it('should be able to get without options', done => {
      Changelog.get((error, results) => {
        expect(error).to.not.exist;
        expect(results).to.exist;
        expect(results.data).to.exist;
        expect(results.data).to.have.length(10);
        expect(results.total).to.exist;
        expect(results.total).to.be.equal(32);
        expect(results.limit).to.exist;
        expect(results.limit).to.be.equal(10);
        expect(results.skip).to.exist;
        expect(results.skip).to.be.equal(0);
        expect(results.page).to.exist;
        expect(results.page).to.be.equal(1);
        expect(results.pages).to.exist;
        expect(results.pages).to.be.equal(4);
        expect(results.lastModified).to.exist;

        expect(_.maxBy(results.data, 'updatedAt').updatedAt).to.be.at.most(
          results.lastModified
        );
        done(error, results);
      });
    });

    it('should be able to get with options', done => {
      const options = { page: 1, limit: 20 };
      Changelog.get(options, (error, results) => {
        expect(error).to.not.exist;
        expect(results).to.exist;
        expect(results.data).to.exist;
        expect(results.data).to.have.length(20);
        expect(results.total).to.exist;
        expect(results.total).to.be.equal(32);
        expect(results.limit).to.exist;
        expect(results.limit).to.be.equal(20);
        expect(results.skip).to.exist;
        expect(results.skip).to.be.equal(0);
        expect(results.page).to.exist;
        expect(results.page).to.be.equal(1);
        expect(results.pages).to.exist;
        expect(results.pages).to.be.equal(2);
        expect(results.lastModified).to.exist;
        expect(_.maxBy(results.data, 'updatedAt').updatedAt).to.be.at.most(
          results.lastModified
        );
        done(error, results);
      });
    });

    it('should be able to search with options', done => {
      const options = { filter: { q: changelogs[0].comment } };
      Changelog.get(options, (error, results) => {
        expect(error).to.not.exist;
        expect(results).to.exist;
        expect(results.data).to.exist;
        expect(results.data).to.have.length(1);
        expect(results.total).to.exist;
        expect(results.total).to.be.equal(1);
        expect(results.limit).to.exist;
        expect(results.limit).to.be.equal(10);
        expect(results.skip).to.exist;
        expect(results.skip).to.be.equal(0);
        expect(results.page).to.exist;
        expect(results.page).to.be.equal(1);
        expect(results.pages).to.exist;
        expect(results.pages).to.be.equal(1);
        expect(results.lastModified).to.exist;
        expect(_.maxBy(results.data, 'updatedAt').updatedAt).to.be.at.most(
          results.lastModified
        );
        done(error, results);
      });
    });

    it('should parse filter options', done => {
      const options = { filter: { comment: changelogs[0].comment } };
      Changelog.get(options, (error, results) => {
        expect(error).to.not.exist;
        expect(results).to.exist;
        expect(results.data).to.exist;
        expect(results.data).to.have.length(1);
        expect(results.total).to.exist;
        expect(results.total).to.be.equal(1);
        expect(results.limit).to.exist;
        expect(results.limit).to.be.equal(10);
        expect(results.skip).to.exist;
        expect(results.skip).to.be.equal(0);
        expect(results.page).to.exist;
        expect(results.page).to.be.equal(1);
        expect(results.pages).to.exist;
        expect(results.pages).to.be.equal(1);
        expect(results.lastModified).to.exist;
        expect(_.maxBy(results.data, 'updatedAt').updatedAt).to.be.at.most(
          results.lastModified
        );
        done(error, results);
      });
    });
  });

  after(done =>
    clear(
      'Changelog',
      'ServiceRequest',
      'Status',
      'Jurisdiction',
      'Priority',
      'Service',
      'ServiceGroup',
      done
    )
  );
});
