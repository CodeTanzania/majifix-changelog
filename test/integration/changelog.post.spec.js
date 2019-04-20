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

  describe('static post', () => {
    it('should be able to post', done => {
      const changelog = Changelog.fake();

      changelog.request = serviceRequest;
      changelog.priority = priority;
      changelog.status = status;

      Changelog.post(changelog, (error, created) => {
        expect(error).to.not.exist;
        expect(created).to.exist;
        expect(created._id).to.eql(changelog._id);
        expect(created.code).to.equal(changelog.code);

        done(error, created);
      });
    });
  });

  describe('instance post', () => {
    it('should be able to post', done => {
      const changelog = Changelog.fake();

      changelog.request = serviceRequest;
      changelog.priority = priority;
      changelog.status = status;

      changelog.post((error, created) => {
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
