import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { Priority } from '@codetanzania/majifix-priority';
import { Service } from '@codetanzania/majifix-service';
import { ServiceGroup } from '@codetanzania/majifix-service-group';
import { ServiceRequest } from '@codetanzania/majifix-service-request';
import { Status } from '@codetanzania/majifix-status';
import { app, mount } from '@lykmapipo/express-common';
import { clear, create } from '@lykmapipo/mongoose-test-helpers';
import { expect } from 'chai';
import request from 'supertest';
import { apiVersion, Changelog, router } from '../../src/index';

describe('Changelog', () => {
  mount(router);

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

    it('should handle HTTP POST on /servicerequests/:servicerequest/changelogs', done => {
      changelog = Changelog.fake();
      changelog.priority = priority;
      changelog.status = status;

      request(app)
        .post(`/${apiVersion}/servicerequests/${serviceRequest._id}/changelogs`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(changelog)
        .expect(201)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const created = response.body;

          expect(created._id).to.exist;
          expect(created.comment).to.exist;

          done(error, response);
        });
    });

    it('should handle HTTP GET on servicerequests/:servicerequest/changelogs', done => {
      request(app)
        .get(`/${apiVersion}/servicerequests/${serviceRequest._id}/changelogs`)
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

    it('should handle HTTP GET on servicerequests/:servicerequest/changelogs/:id', done => {
      request(app)
        .get(
          `/${apiVersion}/servicerequests/${serviceRequest._id}/changelogs/${
            changelog._id
          }`
        )
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

    it('should handle HTTP PATCH on /servicerequests/:servicerequest/changelogs/:id', done => {
      const patch = changelog.fakeOnly('comment');

      request(app)
        .patch(
          `/${apiVersion}/servicerequests/${serviceRequest._id}/changelogs/${
            changelog._id
          }`
        )
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

    it('should handle HTTP PUT on servicerequests/:servicerequest/changelogs/:id', done => {
      const put = changelog.fakeOnly('comment');

      request(app)
        .put(
          `/${apiVersion}/servicerequests/${serviceRequest._id}/changelogs/${
            changelog._id
          }`
        )
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

    it('should handle HTTP DELETE on servicerequests/:servicerequest/changelogs/:id', done => {
      request(app)
        .delete(
          `/${apiVersion}/servicerequests/${serviceRequest._id}/changelogs/${
            changelog._id
          }`
        )
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
