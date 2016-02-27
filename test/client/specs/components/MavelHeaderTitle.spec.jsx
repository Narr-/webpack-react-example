import React from 'react';
import { mount } from 'enzyme';
import MarvelHeaderTitle from 'components/MarvelHeaderTitle';

describe('<MarvelHeaderTitle />', () => {
  describe('is the initial state', () => {
    const marvelHeaderTitle = (<MarvelHeaderTitle />);
    const mountedWrapper = mount(marvelHeaderTitle);

    //
    it('renders a .header-todos and a .header-marvel', () => {
      // console.log(mountedWrapper.debug());
      expect(mountedWrapper.find('.header-todos')).to.have.length(1);
      expect(mountedWrapper.find('.header-marvel')).to.have.length(1);
    });
  });
});
