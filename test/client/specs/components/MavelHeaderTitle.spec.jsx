import React from 'react';
import { mount } from 'enzyme';
import MarvelHeaderTitle from 'components/MarvelHeaderTitle';

describe('<MarvelHeaderTitle />', () => {
  describe('is the initial state', () => {
    sinon.spy(MarvelHeaderTitle.prototype, 'componentDidMount');
    // As of now, can't test the apis of ReactTransitionGroup like componentWillAppear
    const marvelHeaderTitle = (<MarvelHeaderTitle />);
    const mountedWrapper = mount(marvelHeaderTitle);

    //
    it('renders a .header-todos and a .header-marvel', () => {
      // console.log(mountedWrapper.debug());
      expect(MarvelHeaderTitle.prototype.  // eslint-disable-line no-unused-expressions
        componentDidMount.called).to.be.true;
      expect(mountedWrapper.find('.header-todos')).to.have.length(1);
      expect(mountedWrapper.find('.header-marvel')).to.have.length(1);
      MarvelHeaderTitle.prototype.
        componentDidMount.restore(); // restore() is used to restore the original method.
    });
  });
});
