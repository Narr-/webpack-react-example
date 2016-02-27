import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'store';
import { mount } from 'enzyme';
import TodoMakeInput from 'components/TodoMakeInput';

describe('<TodoMakeInput />', () => {
  describe('is the initial state', () => {
    const onSaveHandler = sinon.spy();
    const todoMakeInput = (
      <TodoMakeInput onSave={onSaveHandler}
        initialValues={{ todoMakeInput: '  first text  ' }}
      />
    ); //
    const mountedWrapper = mount(
      <Provider store={configureStore()}>
        {todoMakeInput}
      </Provider>
    ); //

    //
    it('renders a .new-todo', () => {
      // console.log(mountedWrapper.debug());
      expect(mountedWrapper.find('.new-todo')).to.have.length(1);
    });

    //
    it('submits only when the Enter key(13) is pushed', () => {
      mountedWrapper.find('input').simulate('keydown', {
        which: 65
      });
      expect(onSaveHandler.called).to.equal(false);
      mountedWrapper.find('input').prop('onChange')('    text changed    ');
      mountedWrapper.find('input').simulate('keydown', {
        which: 13
      });
      expect(onSaveHandler.lastCall.args[0]).to.equal('text changed');
    });
  });
});
