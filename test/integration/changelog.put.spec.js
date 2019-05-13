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

  describe('static put', () => {
    let changelog;

    before(done => {
      changelog = Changelog.fake();

      changelog.request = serviceRequest;
      changelog.priority = priority;
      changelog.status = status;

      create(changelog, done);
    });

    it('should be able to put', done => {
      changelog = changelog.fakeOnly('comment');

      changelog.request = serviceRequest;
      changelog.priority = priority;
      changelog.status = status;

      Changelog.put(changelog._id, changelog, (error, created) => {
        expect(error).to.not.exist;
        expect(created).to.exist;
        expect(created._id).to.eql(changelog._id);
        expect(created.comment).to.equal(changelog.comment);

        expect(created.status).to.exist;
        expect(created.status.code).to.eql(changelog.status.code);
        expect(created.status.name.en).to.eql(changelog.status.name.en);

        expect(created.priority).to.exist;
        expect(created.priority.code).to.eql(changelog.priority.code);
        expect(created.priority.name.en).to.eql(changelog.priority.name.en);

        done(error, created);
      });
    });

    it('should throw if not exists', done => {
      const fake = Changelog.fake().toObject();
      fake.request = serviceRequest;

      const { _id, ...updates } = fake;

      Changelog.put(_id, updates, (error, updated) => {
        expect(error).to.exist;
        expect(error.status).to.exist;
        expect(error.name).to.exist;
        expect(error.name).to.be.equal('DocumentNotFoundError');
        expect(error.message).to.exist;
        expect(updated).to.not.exist;
        done();
      });
    });
  });

  describe('instance put', () => {
    let changelog;

    before(done => {
      changelog = Changelog.fake();

      changelog.request = serviceRequest;
      changelog.priority = priority;
      changelog.status = status;

      create(changelog, done);
    });

    it('should be able to put', done => {
      changelog = changelog.fakeOnly('comment');

      changelog.request = serviceRequest;
      changelog.priority = priority;
      changelog.status = status;

      changelog.put((error, updated) => {
        expect(error).to.not.exist;
        expect(updated).to.exist;
        expect(updated._id).to.eql(changelog._id);
        expect(updated.comment).to.equal(changelog.comment);

        expect(updated.status).to.exist;
        expect(updated.status.code).to.eql(changelog.status.code);
        expect(updated.status.name.en).to.eql(changelog.status.name.en);

        expect(updated.priority).to.exist;
        expect(updated.priority.code).to.eql(changelog.priority.code);
        expect(updated.priority.name.en).to.eql(changelog.priority.name.en);
        done(error, updated);
      });
    });

    it('should throw if not exists', done => {
      const fake = Changelog.fake('comment');
      changelog._id = fake._id;

      changelog.put((error, updated) => {
        expect(error).to.exist;
        expect(error.status).to.exist;
        expect(updated).to.not.exist;
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
