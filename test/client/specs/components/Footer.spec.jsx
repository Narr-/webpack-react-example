/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow } from 'enzyme';
import Footer from 'components/Footer'; // path is resolved in webpack config in karma.config.js

describe('<Footer />', () => {
  describe('is the initial state ', () => {
    let wrapper;
    let onClearCompletedHandler;

    before(() => {
      onClearCompletedHandler = sinon.spy();
      wrapper = shallow(
        <Footer completedCount={0} activeCount={0}
          filter="all" onClearCompleted={onClearCompletedHandler}
        />
      ); //
    });

    const noItemsStr = 'No items \u00A0left'; // \u00A0 => &nbsp;
    it(`shows ${noItemsStr}`, () => {
      expect(wrapper.find('.todo-count').text()).to.equal(noItemsStr);
    });

    const expectedPropTo = ['/', '/active/', '/completed/'];
    it(`<Link /> components have ${expectedPropTo} as values of the prop, 'to'`, () => {
      const propToArray = [];

      const links = wrapper.find('Link');
      links.forEach((el) => {
        propToArray.push(el.prop('to'));
      });

      expect(propToArray).to.eql(expectedPropTo); // to.eql => to.deep.equal
    });

    it('renders no <button /> element', () => {
      // console.log(wrapper.find('button').find({
      //   className: 'clear-completed'
      // }).debug());

      // wrapper.find('button').find({ className: 'clear-completed' }).simulate('click');
      // expect(onClearCompletedHandler.calledOnce).to.equal(true);

      expect(wrapper.find('button').find({ className: 'clear-completed' })).to.have.length(0);
    });
  });
});
