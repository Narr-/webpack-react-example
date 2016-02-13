import generator from './generator';
import routes from '../client/routes';
import store from '../client/store/configureStore.prod';
import path from 'path';

const targets = [
  '/',
  '/active',
  '/completed',
  '/marvel'
];
const indexPath = path.join(__dirname, '../gh-pages');

export default function runner() {
  generator({
    routes, store, targets, indexPath
  });
}
