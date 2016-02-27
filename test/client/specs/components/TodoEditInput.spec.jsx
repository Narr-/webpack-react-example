import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'store';
import { mount } from 'enzyme';
import TodoEditInput from 'components/TodoEditInput';

describe('<TodoEditInput />', () => {
  describe('is the initial state', () => {
    const onSaveHandler = sinon.spy();
    const todoEditInput = (
      <TodoEditInput onSave={onSaveHandler}
        initialValues={{ todoEditInput: '  init text  ' }}
      />
    ); //
    // to avoid below error msg, wrap the Header with Provider
    // Invariant Violation: Could not find "store" in either the context or
    // props of "Connect(ReduxForm(TodoEditInput))". Either wrap the root component in a <Provider>,
    // or explicitly pass "store" as a prop to "Connect(ReduxForm(TodoEditInput))".
    const mountedWrapper = mount(
      <Provider store={configureStore()}>
        {todoEditInput}
      </Provider>
    ); //

    //
    it('renders an input.edit', () => {
      // console.log(mountedWrapper.debug());
      expect(mountedWrapper.find('input').filter('.edit')).to.have.length(1);
    });

    //
    it('save text when the blur E occurs on the input', () => {
      mountedWrapper.find('input').simulate('blur');
      expect(onSaveHandler.called).to.equal(true);
      const lastCall = onSaveHandler.callCount - 1;
      expect(onSaveHandler.args[lastCall][0]).to.equal('init text');
    });

    //
    it('submits only when the Enter key(13) is pushed', () => {
      const prevCallCount = onSaveHandler.callCount;
      mountedWrapper.find('input').simulate('keydown', {
        which: 65 // 'a' key
      });
      expect(onSaveHandler.callCount).to.equal(prevCallCount);

      mountedWrapper.find('input').prop('onChange')('text changed');
      mountedWrapper.find('input').simulate('keydown', {
        which: 13
      });
      expect(onSaveHandler.lastCall.args[0]).to.equal('text changed');
    });
  });
});
