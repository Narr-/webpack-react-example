import React from 'react';
import { shallow } from 'enzyme';
import Marvel from 'containers/Marvel';

describe('<Marvel />', () => {
  describe('is the initial state', () => {
    const wrapper = shallow(
      <Marvel
        params={{}}
        route={{}}
      />
    ); //

    //
    it('renders a <Connect(App) /> and a <MarvelHeaderTitle />', () => {
      // console.log(wrapper.debug());
      expect(wrapper.find('Connect(App)')).to.have.length(1);
      expect(wrapper.find('Connect(App)').props().params).to.be.an('object');
      expect(wrapper.find('Connect(App)').props().route).to.be.an('object');
      expect(wrapper.find('MarvelHeaderTitle')).to.have.length(1);
    });
  });
});
