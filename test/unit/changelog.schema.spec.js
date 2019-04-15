import { expect } from 'chai';
import Changelog from '../../src/changelog.model';

describe('Changelog', () => {
  describe('Schema', () => {
    it('should have request field', () => {
      const { request } = Changelog.schema.tree;
      const { instance } = Changelog.schema.paths.request;

      expect(instance).to.be.equal('ObjectID');
      expect(request).to.exist;
      expect(request).to.be.an('object');
      expect(request.type).to.be.a('function');
      expect(request.type.name).to.be.equal('ObjectId');
      expect(request.index).to.be.true;
      expect(request.exists).to.be.true;
      expect(request.hidden).to.be.true;
      expect(request.autopopulate).to.exist;
    });

    it('should have status field', () => {
      const { status } = Changelog.schema.tree;
      const { instance } = Changelog.schema.paths.status;
      expect(instance).to.be.equal('ObjectID');

      expect(status).to.exist;
      expect(status).to.be.an('object');
      expect(status.type).to.be.a('function');
      expect(status.type.name).to.be.equal('ObjectId');
      expect(status.index).to.be.true;
      expect(status.exists).to.be.true;
      expect(status.autoset).to.be.true;
      expect(status.autopopulate).to.exist;
    });

    it('should have priority field', () => {
      const { priority } = Changelog.schema.tree;
      const { instance } = Changelog.schema.paths.priority;
      expect(instance).to.be.equal('ObjectID');

      expect(priority).to.exist;
      expect(priority).to.be.an('object');
      expect(priority.type).to.be.a('function');
      expect(priority.type.name).to.be.equal('ObjectId');
      expect(priority.index).to.be.true;
      expect(priority.exists).to.be.true;
      expect(priority.autoset).to.be.true;
      expect(priority.autopopulate).to.exist;
    });

    it('should have assignee field', () => {
      const { assignee } = Changelog.schema.tree;
      const { instance } = Changelog.schema.paths.assignee;
      expect(instance).to.be.equal('ObjectID');

      expect(assignee).to.exist;
      expect(assignee).to.be.an('object');
      expect(assignee.type).to.be.a('function');
      expect(assignee.type.name).to.be.equal('ObjectId');
      expect(assignee.index).to.be.true;
      expect(assignee.exists).to.be.true;
      expect(assignee.autopopulate).to.exist;
    });

    it('should have changer field', () => {
      const { changer } = Changelog.schema.tree;
      const { instance } = Changelog.schema.paths.changer;
      expect(instance).to.be.equal('ObjectID');

      expect(changer).to.exist;
      expect(changer).to.be.an('object');
      expect(changer.type).to.be.a('function');
      expect(changer.type.name).to.be.equal('ObjectId');
      expect(changer.index).to.be.true;
      expect(changer.exists).to.be.true;
      expect(changer.autopopulate).to.exist;
    });

    it('should have comment field', () => {
      const { comment } = Changelog.schema.tree;
      const { instance } = Changelog.schema.paths.comment;
      expect(instance).to.be.equal('String');

      expect(comment).to.exist;
      expect(comment).to.be.an('object');
      expect(comment.type).to.be.a('function');
      expect(comment.type.name).to.be.equal('String');
      expect(comment.index).to.be.true;
      expect(comment.trim).to.be.true;
      expect(comment.searchable).to.be.true;
    });

    it('should have resolvedAt field', () => {
      const { resolvedAt } = Changelog.schema.tree;
      const { instance } = Changelog.schema.paths.resolvedAt;
      expect(instance).to.be.equal('Date');

      expect(resolvedAt).to.exist;
      expect(resolvedAt).to.be.an('object');
      expect(resolvedAt.type).to.be.a('function');
      expect(resolvedAt.type.name).to.be.equal('Date');
      expect(resolvedAt.index).to.be.true;
    });

    it('should have reopenedAt field', () => {
      const { reopenedAt } = Changelog.schema.tree;
      const { instance } = Changelog.schema.paths.reopenedAt;
      expect(instance).to.be.equal('Date');

      expect(reopenedAt).to.exist;
      expect(reopenedAt).to.be.an('object');
      expect(reopenedAt.type).to.be.a('function');
      expect(reopenedAt.type.name).to.be.equal('Date');
      expect(reopenedAt.index).to.be.true;
    });

    it('should have shouldNotify field', () => {
      const { shouldNotify } = Changelog.schema.tree;
      const { instance } = Changelog.schema.paths.shouldNotify;
      expect(instance).to.be.equal('Boolean');

      expect(shouldNotify).to.exist;
      expect(shouldNotify).to.be.an('object');
      expect(shouldNotify.type).to.be.a('function');
      expect(shouldNotify.type.name).to.be.equal('Boolean');
      expect(shouldNotify.default).to.be.false;
    });

    it('should have wasNotificationSent field', () => {
      const { wasNotificationSent } = Changelog.schema.tree;
      const { instance } = Changelog.schema.paths.wasNotificationSent;
      expect(instance).to.be.equal('Boolean');

      expect(wasNotificationSent).to.exist;
      expect(wasNotificationSent).to.be.an('object');
      expect(wasNotificationSent.type).to.be.a('function');
      expect(wasNotificationSent.type.name).to.be.equal('Boolean');
      expect(wasNotificationSent.default).to.be.false;
    });

    it('should have visibility field', () => {
      const { visibility } = Changelog.schema.tree;
      const { instance } = Changelog.schema.paths.visibility;
      expect(instance).to.be.equal('String');

      expect(visibility).to.exist;
      expect(visibility).to.be.an('object');
      expect(visibility.type).to.be.a('function');
      expect(visibility.type.name).to.be.equal('String');
      expect(visibility.default).to.be.equal('Private');
      expect(visibility.enum).to.be.an('array');
      expect(visibility.enum).to.be.eql(Changelog.VISIBILITIES);
    });
  });
});
