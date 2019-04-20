import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { Priority } from '@codetanzania/majifix-priority';
import { Service } from '@codetanzania/majifix-service';
import { ServiceGroup } from '@codetanzania/majifix-service-group';
import { ServiceRequest } from '@codetanzania/majifix-service-request';
import { Status } from '@codetanzania/majifix-status';
import { clear, create } from '@lykmapipo/mongoose-test-helpers';
import { expect } from 'chai';
import { Changelog } from '../../src/index';

describe('Changelog', () => {
  const jurisdiction = Jurisdiction.fake();
  const serviceGroup = ServiceGroup.fake();

  const status = Status.fake();
  const priority = Priority.fake();

  const service = Service.fake();
  service.group = serviceGroup;

  const serviceRequest = ServiceRequest.fake();

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

  describe('static delete', () => {
    let changelog;

    before(done => {
      changelog = Changelog.fake();

      changelog.request = serviceRequest;
      changelog.priority = priority;
      changelog.status = status;

      create(changelog, done);
    });

    it('should be able to delete', done => {
      Changelog.del(changelog._id, (error, deleted) => {
        expect(error).to.not.exist;
        expect(deleted._id).to.eql(changelog._id);
        expect(deleted.comment).to.equal(changelog.comment);
        expect(deleted).to.exist;

        expect(deleted.status).to.exist;
        expect(deleted.status.code).to.eql(changelog.status.code);
        expect(deleted.status.name.en).to.eql(changelog.status.name.en);

        expect(deleted.priority).to.exist;
        expect(deleted.priority.code).to.eql(changelog.priority.code);
        expect(deleted.priority.name.en).to.eql(changelog.priority.name.en);

        done(error, deleted);
      });
    });

    it('should throw if not exists', done => {
      Changelog.del(changelog._id, (error, deleted) => {
        expect(error).to.exist;
        expect(error.status).to.exist;
        expect(error.message).to.be.equal('Not Found');
        expect(deleted).to.not.exist;
        done();
      });
    });
  });

  describe('instance delete', () => {
    let changelog;

    before(done => {
      changelog = Changelog.fake();

      changelog.request = serviceRequest;
      changelog.priority = priority;
      changelog.status = status;

      create(changelog, done);
    });

    it('should be able to delete', done => {
      changelog.del((error, deleted) => {
        expect(error).to.not.exist;
        expect(deleted).to.exist;
        expect(deleted._id).to.eql(changelog._id);
        expect(deleted.comment).to.equal(changelog.comment);

        expect(deleted.status).to.exist;
        expect(deleted.status.code).to.eql(changelog.status.code);
        expect(deleted.status.name.en).to.eql(changelog.status.name.en);

        expect(deleted.priority).to.exist;
        expect(deleted.priority.code).to.eql(changelog.priority.code);
        expect(deleted.priority.name.en).to.eql(changelog.priority.name.en);
        done(error, deleted);
      });
    });

    it.skip('should throw if not exists', done => {
      changelog.del((error, deleted) => {
        expect(error).to.exist;
        expect(error.status).to.exist;
        expect(deleted).to.not.exist;
        done();
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
