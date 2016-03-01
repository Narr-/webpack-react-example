import reducer from 'reducers/todos';
import types from 'actions/todos';
import Immutable from 'immutable';

describe('reducers - todos', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(Immutable.fromJS([]));
  });

  it('should handle ADD_TODO', () => {
    const action = types.addTodo(72, 'Run the tests');
    expect(Immutable.is(reducer(Immutable.fromJS([]), action), Immutable.fromJS([
      {
        todoId: action.id,
        todoText: action.text,
        todoIsEditing: false,
        todoCompleted: false
      }
    ]))).to.equal(true);

    expect(Immutable.is( // eslint-disable-line no-unused-expressions
      reducer(Immutable.fromJS([
        {
          todoId: 234,
          todoText: 'first text',
          todoIsEditing: false,
          todoCompleted: true
        }
      ]), action),
      Immutable.fromJS([
        {
          todoId: action.id,
          todoText: action.text,
          todoIsEditing: false,
          todoCompleted: false
        },
        {
          todoId: 234,
          todoText: 'first text',
          todoIsEditing: false,
          todoCompleted: true
        }
      ])
    )).to.be.true;
  });

  it('should handle COMPLETE_ALL', () => {
    const actionTrue = types.completeAll(false);
    expect(Immutable.is(
      reducer(Immutable.fromJS([
        {
          todoId: 234,
          todoText: 'first text',
          todoIsEditing: false,
          todoCompleted: false
        },
        {
          todoId: 432,
          todoText: 'second text',
          todoIsEditing: false,
          todoCompleted: true
        }
      ]), actionTrue),
      Immutable.fromJS([
        {
          todoId: 234,
          todoText: 'first text',
          todoIsEditing: false,
          todoCompleted: true
        },
        {
          todoId: 432,
          todoText: 'second text',
          todoIsEditing: false,
          todoCompleted: true
        }
      ])
    )).to.equal(true);

    const actionFalse = types.completeAll(true);
    expect(Immutable.is(
      reducer(Immutable.fromJS([
        {
          todoId: 234,
          todoText: 'first text',
          todoIsEditing: false,
          todoCompleted: false
        },
        {
          todoId: 432,
          todoText: 'second text',
          todoIsEditing: false,
          todoCompleted: true
        }
      ]), actionFalse),
      Immutable.fromJS([
        {
          todoId: 234,
          todoText: 'first text',
          todoIsEditing: false,
          todoCompleted: false
        },
        {
          todoId: 432,
          todoText: 'second text',
          todoIsEditing: false,
          todoCompleted: false
        }
      ])
    )).to.equal(true);
  });

  it('should handle CLEAR_COMPLETED', () => {
    const action = types.clearCompleted();
    expect(Immutable.is(
      reducer(Immutable.fromJS([
        {
          todoId: 234,
          todoText: 'first text',
          todoIsEditing: false,
          todoCompleted: false
        },
        {
          todoId: 432,
          todoText: 'second text',
          todoIsEditing: false,
          todoCompleted: true
        }
      ]), action),
      Immutable.fromJS([
        {
          todoId: 234,
          todoText: 'first text',
          todoIsEditing: false,
          todoCompleted: false
        }
      ])
    )).to.equal(true);

    expect(Immutable.is(
      reducer(Immutable.fromJS([
        {
          todoId: 234,
          todoText: 'first text',
          todoIsEditing: false,
          todoCompleted: true
        },
        {
          todoId: 432,
          todoText: 'second text',
          todoIsEditing: false,
          todoCompleted: true
        }
      ]), action),
      Immutable.fromJS([
      ])
    )).to.equal(true);
  });

  it('should handle SET_EDITING_STATUS', () => {
    const action = types.setEditStatus(234);
    expect(Immutable.is(
      reducer(Immutable.fromJS([
        {
          todoId: 234,
          todoText: 'first text',
          todoIsEditing: false,
          todoCompleted: false
        }
      ]), action),
      Immutable.fromJS([
        {
          todoId: 234,
          todoText: 'first text',
          todoIsEditing: true,
          todoCompleted: false
        }
      ])
    )).to.equal(true);

    expect(Immutable.is(
      reducer(Immutable.fromJS([
        {
          todoId: 234,
          todoText: 'first text',
          todoIsEditing: true,
          todoCompleted: true
        },
        {
          todoId: 432,
          todoText: 'second text',
          todoIsEditing: false,
          todoCompleted: true
        }
      ]), action),
      Immutable.fromJS([
        {
          todoId: 234,
          todoText: 'first text',
          todoIsEditing: false,
          todoCompleted: true
        },
        {
          todoId: 432,
          todoText: 'second text',
          todoIsEditing: false,
          todoCompleted: true
        }
      ])
    )).to.equal(true);
  });

  it('should handle EDIT_TODO', () => {
    const action = types.editTodo(234, 'edited Text');
    expect(Immutable.is(
      reducer(Immutable.fromJS([
        {
          todoId: 234,
          todoText: 'first text',
          todoIsEditing: false,
          todoCompleted: false
        },
        {
          todoId: 235,
          todoText: 'second text',
          todoIsEditing: false,
          todoCompleted: true
        }
      ]), action),
      Immutable.fromJS([
        {
          todoId: 234,
          todoText: 'edited Text',
          todoIsEditing: false,
          todoCompleted: false
        },
        {
          todoId: 235,
          todoText: 'second text',
          todoIsEditing: false,
          todoCompleted: true
        }
      ])
    )).to.equal(true);
  });

  it('should handle COMPLETE_TODO', () => {
    const action = types.completeTodo(234);
    expect(Immutable.is(
      reducer(Immutable.fromJS([
        {
          todoId: 234,
          todoText: 'first text',
          todoIsEditing: false,
          todoCompleted: false
        }
      ]), action),
      Immutable.fromJS([
        {
          todoId: 234,
          todoText: 'first text',
          todoIsEditing: false,
          todoCompleted: true
        }
      ])
    )).to.equal(true);

    expect(Immutable.is(
      reducer(Immutable.fromJS([
        {
          todoId: 234,
          todoText: 'first text',
          todoIsEditing: false,
          todoCompleted: true
        }
      ]), action),
      Immutable.fromJS([
        {
          todoId: 234,
          todoText: 'first text',
          todoIsEditing: false,
          todoCompleted: false
        }
      ])
    )).to.equal(true);
  });

  it('should handle DELETE_TODO', () => {
    const action = types.deleteTodo(234);
    expect(Immutable.is(
      reducer(Immutable.fromJS([
        {
          todoId: 234,
          todoText: 'first text',
          todoIsEditing: false,
          todoCompleted: false
        }
      ]), action),
      Immutable.fromJS([
      ])
    )).to.equal(true);
  });

  it('should handle REPLACE_TODOS', () => {
    const newTodos = Immutable.fromJS([
      {
        todoId: 369,
        todoText: 'new text',
        todoIsEditing: false,
        todoCompleted: false
      }
    ]);
    const action = types.replaceTodos(newTodos);

    expect(Immutable.is(
      reducer(Immutable.fromJS([
        {
          todoId: 234,
          todoText: 'first text',
          todoIsEditing: false,
          todoCompleted: false
        },
        {
          todoId: 432,
          todoText: 'second text',
          todoIsEditing: false,
          todoCompleted: true
        }
      ]), action),
      newTodos
    )).to.equal(true);
  });
});
