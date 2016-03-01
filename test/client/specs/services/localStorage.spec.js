import localStorage, {
  getTodos, addTodo, completeAll, clearCompleted,
  updateTodo, deleteTodo
}
from 'services/localStorage';

describe('services - localStorage', () => {
  window.localStorage.clear();
  // console.log(window.localStorage);
  const saveTodos = localStorage.__GetDependency__('saveToLocalStorage');
  after(() => {
    localStorage.__ResetDependency__('todos');
  });

  it('should handle saveToLocalStorage() and getTodos()', (done) => {
    const dummyData = [1, 2, 3, 5];
    localStorage.__Rewire__('todos', dummyData);
    saveTodos();
    getTodos().then(result => {
      expect(result.data).to.eql(dummyData);
      done();
    });
  });

  it('should handle saveToLocalStorage() and getTodos() with invaild storage id', (done) => {
    const dummyData = [1, 4, 3, 5];
    localStorage.__Rewire__('todos', dummyData);
    saveTodos();
    localStorage.__Rewire__('STORAGE_ID', 'invaild storage id');
    getTodos().then(result => {
      expect(result.data).to.eql([]);
      localStorage.__ResetDependency__('STORAGE_ID');
      done();
    });
  });

  it('should handle addTodo()', (done) => {
    const dummyData = [1, 'a', 2, 'b'];
    localStorage.__Rewire__('todos', dummyData);
    addTodo('428', 'merong').then(() => {
      getTodos().then(result => {
        expect(result.data).to.eql([
          {
            todoId: '428',
            todoText: 'merong',
            todoIsEditing: false,
            todoCompleted: false
          },
          1, 'a', 2, 'b'
        ]);
        done();
      });
    });
  });

  it('should handle completeAll()', (done) => {
    const dummyData = [
      { todoId: '1', todoText: 'first1', todoIsEditing: false, todoCompleted: true },
      { todoId: '2', todoText: 'second2', todoIsEditing: false, todoCompleted: true }
    ];
    localStorage.__Rewire__('todos', dummyData);
    completeAll(false).then(() => {
      getTodos().then(result => {
        expect(result.data).to.eql([
          { todoId: '1', todoText: 'first1', todoIsEditing: false, todoCompleted: false },
          { todoId: '2', todoText: 'second2', todoIsEditing: false, todoCompleted: false }
        ]);
        done();
      });
    });
  });

  it('should handle clearCompleted()', (done) => {
    const dummyData = [
      { todoId: '1', todoText: 'first1', todoIsEditing: false, todoCompleted: true },
      { todoId: '2', todoText: 'second2', todoIsEditing: false, todoCompleted: false }
    ];
    localStorage.__Rewire__('todos', dummyData);
    clearCompleted().then(() => {
      getTodos().then(result => {
        expect(result.data).to.eql([
          { todoId: '2', todoText: 'second2', todoIsEditing: false, todoCompleted: false }
        ]);
        done();
      });
    });
  });

  it('should handle updateTodo()', (done) => {
    const dummyData = [
      { todoId: '1', todoText: 'first1', todoIsEditing: false, todoCompleted: true },
      { todoId: '2', todoText: 'second2', todoIsEditing: false, todoCompleted: false }
    ];
    localStorage.__Rewire__('todos', dummyData);
    updateTodo('2', '2second', true, true).then(() => {
      getTodos().then(result => {
        expect(result.data).to.eql([
          { todoId: '1', todoText: 'first1', todoIsEditing: false, todoCompleted: true },
          { todoId: '2', todoText: '2second', todoIsEditing: true, todoCompleted: true }
        ]);
        done();
      });
    });
  });

  it('should handle deleteTodo()', (done) => {
    const dummyData = [
      { todoId: '1', todoText: 'first1', todoIsEditing: false, todoCompleted: true },
      { todoId: '2', todoText: 'second2', todoIsEditing: false, todoCompleted: false }
    ];
    localStorage.__Rewire__('todos', dummyData);
    deleteTodo('1').then(() => {
      getTodos().then(result => {
        expect(result.data).to.eql([
          { todoId: '2', todoText: 'second2', todoIsEditing: false, todoCompleted: false }
        ]);
        done();
      });
    });
  });
});
