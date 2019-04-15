import { expect } from 'chai';

import Changelog from '../../src/changelog.model';

describe('Changelog', () => {
  describe('Statics', () => {
    it('should expose model name as constant', () => {
      expect(Changelog.MODEL_NAME).to.exist;
      expect(Changelog.MODEL_NAME).to.be.equal('Changelog');
    });

    it('should expose model visibility as constant', () => {
      expect(Changelog.VISIBILITY_PUBLIC).to.exist;
      expect(Changelog.VISIBILITY_PRIVATE).to.exist;
      expect(Changelog.VISIBILITIES).to.exist;
      expect(Changelog.VISIBILITIES).to.be.an('Array');
      expect(Changelog.VISIBILITY_PRIVATE).to.equal('Private');
      expect(Changelog.VISIBILITY_PUBLIC).to.equal('Public');
      expect(Changelog.VISIBILITIES).to.eql(['Private', 'Public']);
    });
  });
});
