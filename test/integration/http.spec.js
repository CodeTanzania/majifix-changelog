import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { Priority } from '@codetanzania/majifix-priority';
import { Service } from '@codetanzania/majifix-service';
import { ServiceGroup } from '@codetanzania/majifix-service-group';
import { ServiceRequest } from '@codetanzania/majifix-service-request';
import { Status } from '@codetanzania/majifix-status';
import { clear, create } from '@lykmapipo/mongoose-test-helpers';
import { expect } from 'chai';
import request from 'supertest';
import { apiVersion, app, Changelog } from '../../src/index';

describe('Changelog', () => {
  describe('Rest API', () => {
    let changelog;
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

    before(done => {
      changelog = Changelog.fake();

      changelog.request = serviceRequest;
      changelog.priority = priority;
      changelog.status = status;

      create(changelog, done);
    });

    it.skip('should handle HTTP POST on /changelogs', done => {
      changelog = Changelog.fake();

      request(app)
        .post(`/${apiVersion}/changelogs`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(changelog)
        .expect(201)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const created = response.body;

          expect(created._id).to.exist;
          expect(created.name).to.exist;

          done(error, response);
        });
    });

    it('should handle HTTP GET on /changelogs', done => {
      request(app)
        .get(`/${apiVersion}/changelogs`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          // assert payload
          const result = response.body;
          expect(result.data).to.exist;
          expect(result.total).to.exist;
          expect(result.limit).to.exist;
          expect(result.skip).to.exist;
          expect(result.page).to.exist;
          expect(result.pages).to.exist;
          expect(result.lastModified).to.exist;
          done(error, response);
        });
    });

    it('should handle HTTP GET on /changelogs/:id', done => {
      request(app)
        .get(`/${apiVersion}/changelogs/${changelog._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const found = response.body;
          expect(found._id).to.exist;
          expect(found._id).to.be.equal(changelog._id.toString());
          expect(found.comment).to.be.equal(changelog.comment);

          done(error, response);
        });
    });

    it('should handle HTTP PATCH on /changelogs/:id', done => {
      const patch = changelog.fakeOnly('comment');

      request(app)
        .patch(`/${apiVersion}/changelogs/${changelog._id}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(patch)
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const patched = response.body;

          expect(patched._id).to.exist;
          expect(patched._id).to.be.equal(changelog._id.toString());
          expect(patched.comment).to.be.equal(changelog.comment);

          done(error, response);
        });
    });

    it('should handle HTTP PUT on /changelogs/:id', done => {
      const put = changelog.fakeOnly('comment');

      request(app)
        .put(`/${apiVersion}/changelogs/${changelog._id}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(put)
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const updated = response.body;

          expect(updated._id).to.exist;
          expect(updated._id).to.be.equal(changelog._id.toString());
          expect(updated.comment).to.be.equal(changelog.comment);

          done(error, response);
        });
    });

    it('should handle HTTP DELETE on /changelogs/:id', done => {
      request(app)
        .delete(`/${apiVersion}/changelogs/${changelog._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const deleted = response.body;

          expect(deleted._id).to.exist;
          expect(deleted._id).to.be.equal(changelog._id.toString());
          expect(deleted.comment).to.be.equal(changelog.comment);

          done(error, response);
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
});
