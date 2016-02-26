/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, mount } from 'enzyme';
import Footer from 'components/Footer'; // path is resolved in webpack config in karma.config.js

describe('<Footer />', () => {
  let numOfCompleted = null;
  let numOfActive = null;
  let statusOfFilter = null;

  describe('is the initial state', () => {
    let wrapper;
    let onClearCompletedHandler;
    let mountedWrapper;

    before(() => {
      onClearCompletedHandler = sinon.spy();
      const footer = (<Footer completedCount={0} activeCount={0}
        filter="all" onClearCompleted={onClearCompletedHandler}
      />); //
      wrapper = shallow(footer);
      mountedWrapper = mount(footer);
    });

    //
    const noItemsStr = 'No items \u00A0left'; // \u00A0 => &nbsp;
    it(`shows ${noItemsStr}`, () => {
      expect(wrapper.find('.todo-count').text()).to.equal(noItemsStr);
    });

    //
    const expectedPropTo = ['/', '/active/', '/completed/'];
    it(`<Link /> components have ${expectedPropTo} as values of the prop, 'to'`, () => {
      const propToArray = [];

      const links = wrapper.find('Link');
      links.forEach((el) => {
        propToArray.push(el.prop('to'));
      });

      expect(propToArray).to.eql(expectedPropTo); // to.eql => to.deep.equal
    });

    //
    it('click is prevented when it occured on <Link />, All', () => {
      // console.log(mountedWrapper.find('.filters').find('a'));
      let target;
      const aLinks = mountedWrapper.find('.filters').find('a');
      for (let i = aLinks.length - 1; i > -1; i--) {
        if (aLinks.at(i).text() === 'All') {
          target = aLinks.at(i);
          break;
        }
      }
      const e = {
        preventDefault: sinon.spy()
      };
      target.simulate('click', e);
      expect(e.preventDefault.called).to.equal(true);
    });

    //
    it('renders no <button /> element', () => {
      // console.log(wrapper.find('button').find({
      //   className: 'clear-completed'
      // }).debug());

      expect(wrapper.find('button').find({ className: 'clear-completed' })).to.have.length(0);
    });
  });

  //
  numOfCompleted = 3;
  numOfActive = 1;
  statusOfFilter = 'active';

  describe(`has ${numOfCompleted} completed ones,` +
    `${numOfActive} acive item and ${statusOfFilter} status`, () => {
    let wrapper;
    let onClearCompletedHandler;
    let mountedWrapper;

    before(() => {
      onClearCompletedHandler = sinon.spy();
      const footer = (
        <Footer completedCount={numOfCompleted} activeCount={numOfActive}
          filter={statusOfFilter} onClearCompleted={onClearCompletedHandler}
        />
      ); //
      wrapper = shallow(footer);
      mountedWrapper = mount(footer);
    });

    //
    const noItemsStr = '1 item \u00A0left';
    it(`shows ${noItemsStr}`, () => {
      expect(wrapper.find('.todo-count').text()).to.equal(noItemsStr);
    });

    //
    it('renders three <Link /> components', () => {
      expect(wrapper.find('Link')).to.have.length(3);
    });

    //
    it('click is not prevented when it occured on <Link />, All', () => {
      let target;
      const aLinks = mountedWrapper.find('.filters').find('a');
      for (let i = aLinks.length - 1; i > -1; i--) {
        if (aLinks.at(i).text() === 'All') {
          target = aLinks.at(i);
          break;
        }
      }
      const e = {
        preventDefault: sinon.spy()
      };
      target.simulate('click', e);
      expect(e.preventDefault.called).to.equal(false);
    });

    //
    it('click is prevented when it occured on <Link />, Active', () => {
      let target;
      const aLinks = mountedWrapper.find('.filters').find('a');
      for (let i = aLinks.length - 1; i > -1; i--) {
        if (aLinks.at(i).text() === 'Active') {
          target = aLinks.at(i);
          break;
        }
      }
      const e = {
        preventDefault: sinon.spy()
      };
      target.simulate('click', e);
      expect(e.preventDefault.called).to.equal(true);
    });

    //
    it('simulates click events', () => {
      wrapper.find('button').find({ className: 'clear-completed' }).simulate('click');
      expect(onClearCompletedHandler.calledOnce).to.equal(true);
    });
  });
});
