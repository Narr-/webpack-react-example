import io from 'socket.io-client';
import api from '../services/api';
import { Map as iMap, List as iList } from 'immutable';
import humps from 'humps';
import { getStore } from '../store';
import todoActions from '../actions/todos';

let todoSocket = null;

export default function socket() {
  if (typeof WEBPACK_VAR !== 'undefined' && todoSocket === null) {
    todoSocket = io({
      // A simple way for node clusters to work is just using websocket.
      // If wanna support xhr polling,
      // it is the best to use Nginx as load balancer on different ports
      // http://socket.io/docs/using-multiple-nodes/
      // https://github.com/Unitech/pm2/issues/389
      transports: ['websocket'],
      reconnectionAttempts: 2,
      reconnectionDelay: 5000
    });

    todoSocket.on('connect', () => {
      const userId = localStorage.getItem('todoUserId');
      if (userId) {
        todoSocket.emit('join', {
          message: 'join the userId\'s room',
          dataObj: {
            userId
          }
        });
      }
      if (typeof console !== 'undefined') {
        console.log(`socket id: ${todoSocket.id}` + // eslint-disable-line no-console
         'is connected..!!');
      }
    });

    todoSocket.on('dbChange', (data) => {
      // console.log(data);
      if (todoSocket.id !== data.senderId) {
        api.getTodos().then(result => {
          if (!result.error) {
            // console.log(result);
            const immutableList = iList();
            const todos = result.data.reduce((pre, curr) =>
              pre.push(iMap(humps.camelizeKeys(curr))), immutableList);
            getStore().dispatch(todoActions.replaceTodos(todos));
          }
        });
      }
    });
  }

  return todoSocket;
}
