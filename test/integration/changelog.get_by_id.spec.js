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
  let changelog;

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
    changelog = Changelog.fake();

    changelog.request = serviceRequest;
    changelog.priority = priority;
    changelog.status = status;

    create(changelog, done);
  });

  describe('get by id', () => {
    it('should be able to get an instance', done => {
      Changelog.getById(changelog._id, (error, found) => {
        expect(error).to.not.exist;
        expect(found).to.exist;
        expect(found._id).to.eql(changelog._id);

        // assert jurisdiction
        expect(found.request).to.exist;
        expect(found.request.code).to.eql(changelog.request.code);

        done(error, found);
      });
    });

    it('should be able to get with options', done => {
      const options = {
        _id: changelog._id,
        select: 'comment',
      };

      Changelog.getById(options, (error, found) => {
        expect(error).to.not.exist;
        expect(found).to.exist;
        expect(found._id).to.eql(changelog._id);
        expect(found.comment).to.exist;

        // ...assert selection
        const fields = _.keys(found.toObject());
        expect(fields).to.have.length(5);
        _.map(['changer', 'assignee', 'createdAt', 'updatedAt'], field => {
          expect(fields).to.not.include(field);
        });

        done(error, found);
      });
    });

    it('should throw if not exists', done => {
      const fake = Changelog.fake();

      Changelog.getById(fake._id, (error, found) => {
        expect(error).to.exist;
        expect(error.status).to.exist;
        expect(error.message).to.be.equal('Not Found');
        expect(found).to.not.exist;
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
