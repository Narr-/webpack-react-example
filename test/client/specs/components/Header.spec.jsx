import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'store';
import { shallow, mount } from 'enzyme';
import Header from 'components/Header';
import MarvelHeaderTitle from 'components/MarvelHeaderTitle';

describe('<Header />', () => {
  describe('is the initial state', () => {
    const addTodoHandler = sinon.spy();
    const header = (<Header addTodo={addTodoHandler} />); //
    const wrapper = shallow(header);

    // to avoid below error msg, wrap the Header with Provider
    // Invariant Violation: Could not find "store" in either the context or
    // props of "Connect(ReduxForm(TodoMakeInput))". Either wrap the root component in a <Provider>,
    // or explicitly pass "store" as a prop to "Connect(ReduxForm(TodoMakeInput))".
    const mountedWrapper = mount( // eslint-disable-line no-unused-vars
      <Provider store={configureStore()}>
        {header}
      </Provider>
    ); //

    //
    it('header\'s className is header', () => {
      expect(wrapper.find('header').props().className).to.equal('header');
    });

    //
    it('<h1> has a title, "todos"', () => {
      expect(wrapper.find('h1').text()).to.equal('todos');
    });

    //
    it('when simulating a click event on mavelLink, its state changes', () => {
      const marvelLink = wrapper.find({ className: 'icon-marvel-logo' }).find('a');
      // console.log(marvelLink.debug());
      expect(wrapper.state().loadingMarvel).to.equal(false);
      // console.log(wrapper.debug());
      marvelLink.simulate('click');
      expect(wrapper.state('loadingMarvel')).to.equal(true);
      // console.log(wrapper.debug());
      expect(wrapper.find('Spinner')).to.have.length(1);
    });

    //
    it('calls onSave on TodoMakeInput', () => {
      const todoMakeInput = wrapper.find('ConnectedForm');
      todoMakeInput.prop('onSave')(''); // text length === 0
      expect(addTodoHandler.called).to.equal(false);
      todoMakeInput.prop('onSave')('test text'); // text length !== 0
      expect(addTodoHandler.called).to.equal(true);
      const lastCall = addTodoHandler.callCount - 1;
      expect(addTodoHandler.args[lastCall][0]).to.equal('test text');
    });
  });

  //
  describe('is MarvelHeader', () => {
    const addTodoHandler = sinon.spy();
    const header = (
      <Header addTodo={addTodoHandler} isFromMarvel >
        <MarvelHeaderTitle />
      </Header>
    ); //
    const wrapper = shallow(header);

    //
    it('header\'s className is marvel-header', () => {
      expect(wrapper.find('header').props().className).to.equal('marvel-header');
    });

    //
    it('renders a "MarvelHeaderTitle"', () => {
      expect(wrapper.find('ReactTransitionGroup').find('MarvelHeaderTitle')).to.have.length(1);
    });

    //
    it('renders <h1> that has a text, "todos"', () => {
      const header2 = (
        <Header addTodo={addTodoHandler} isFromMarvel >
          <span>test span</span>
        </Header>
      );
      const wrapper2 = shallow(header2);
      expect(wrapper2.find('h1').text()).to.equal('todos');
    });

    //
    it('when simulating a click event on mavelLink, its state doesn\'t change', () => {
      const marvelLink = wrapper.find({ className: 'icon-marvel-logo' }).find('a');
      expect(wrapper.state().loadingMarvel).to.equal(false);
      marvelLink.simulate('click');
      expect(wrapper.state('loadingMarvel')).to.equal(false);
    });
  });
});
