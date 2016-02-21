import dev from './configureStore.dev';
import prod from './configureStore.prod';

let configureStore;
if (process.env.NODE_ENV === 'production') {
  configureStore = prod;
} else {
  configureStore = dev;
}

let savedStore;
export function setStore(store) {
  if (!savedStore) {
    savedStore = store;
  }
}

export function getStore() {
  return savedStore;
}

export default configureStore;
