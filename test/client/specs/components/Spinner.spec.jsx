import React from 'react';
import { shallow } from 'enzyme';
import Spinner from 'components/Spinner';

describe('<Spinner />', () => {
  describe('is the initial state', () => {
    const spinner = (<Spinner />);
    const wrapper = shallow(spinner);

    //
    it('renders 5 chilren', () => {
      // console.log(wrapper.debug());
      expect(wrapper.find('.spinner').children()).to.have.length(5);
    });
  });
});
