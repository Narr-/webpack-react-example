/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow } from 'enzyme';
import { App } from 'containers/App';
import Immutable from 'immutable';
import fetchMock from 'fetch-mock';
import api from 'services/api'; // to replace fetch with mocked fetch

describe('<App />', () => {
  describe('is the initial state', () => {
    const todos = Immutable.fromJS([{
      todoId: 8,
      todoText: 'first text',
      todoIsEditing: false,
      todoCompleted: false
    }]);
    const completeAll = sinon.spy();
    const appActions = {
      addTodo: sinon.spy(),
      completeAll: (p1) => { // because this method is replaced in App
        completeAll(p1);
      },
      replaceTodos: sinon.spy()
    };

    const wrapper = shallow(
      <App
        todos={todos}
        appActions={appActions}
        params={{}}
        route={{}}
      />
    ); //

    //
    it('fetch todos', (done) => {
      const userId = 'narr';
      // console.log(fetch); // before mock
      fetchMock
        .mock('http://localhost/api', 'POST', {
          status: 200,
          body: {
            userId,
            message: 'welcome..!!'
          }
        })
        .mock(`http://localhost/api/todos?userId=${userId}`, 'GET', [{
          todoId: 369,
          todoText: 'fetched text',
          todoIsEditing: false,
          todoCompleted: true
        }]);
      // console.log(fetch); // after mock
      api.__Rewire__('fetch', fetch);
      App.fetchTodos('http://localhost/', 'userId').then(result => {
        // console.log(result);
        expect(result.todos.get(0).get('todoId')).to.equal(369);
        // to.have.string('fetched') => "fetched" in "fetched text"
        expect(result.todos.get(0).get('todoText')).to.have.string('fetched');
        api.__ResetDependency__('fetch');
        fetchMock.restore();
        done();
      });
    });

    //
    it('run componentDidMount()', (done) => {
      // console.log(fetch); // before mock
      fetchMock
        .mock(/http:\/\/localhost\/api\/todos\?userId=/, 'GET', {
          status: 404,
          body: {
            error: 'intended error'
          }
        });
      // console.log(fetch); // after mock
      api.__Rewire__('fetch', fetch);
      App.prototype.componentDidMount().then(result => {
        // console.log(result);
        expect(result.response.status).to.equal(404);
        expect(result.error).to.be.ok;
        api.__ResetDependency__('fetch');
        fetchMock.restore();
        done();
      });
    });

    //
    it('renders a <Header /> and a <MainSection />', () => {
      // console.log(wrapper.debug());
      expect(wrapper.find('Header')).to.have.length(1);
      expect(wrapper.find('Header').props().isFromMarvel).to.be.undefined;
      expect(wrapper.find('MainSection')).to.have.length(1);
      expect(wrapper.find('MainSection').prop('filter')).to.equal('all');
    });

    //
    it('executes <Header />\'s addTodo', () => {
      wrapper.find('Header').prop('addTodo')('new text');
      expect(appActions.addTodo.lastCall.args[1]).to.equal('new text');
    });

    //
    it('executes <MainSection />\'s completeAll', () => {
      wrapper.find('MainSection').prop('actions').completeAll();
      expect(completeAll.lastCall.args[0]).to.equal(false);
    });
  });

  describe('params\'s status is active', () => {
    const wrapper = shallow(
      <App
        todos={Immutable.fromJS([])}
        appActions={{}}
        params={{ status: 'active' }}
        route={{}}
      />
    ); //

    //
    it('<MainSection /> has filter, active', () => {
      expect(wrapper.find('MainSection').prop('filter')).to.equal('active');
    });
  });

  describe('isFromMarvel is true', () => {
    const wrapper = shallow(
      <App
        todos={Immutable.fromJS([])}
        appActions={{}}
        params={{}}
        route={{ isFromMarvel: true }}
      />
    ); //

    //
    it('<Header /> has isFromMarvel', () => {
      expect(wrapper.find('Header').prop('isFromMarvel')).to.equal(true);
    });

    //
    it('<MainSection /> has filter, marvel', () => {
      expect(wrapper.find('MainSection').prop('filter')).to.equal('marvel');
    });
  });
});
