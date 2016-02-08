const env = process.env;
export const NODE_ENV = env.NODE_ENV;
export const PORT = env.PORT || 3000;
export const DOCKER_MACHINE_IP = '192.168.99.100';
const POSTGRESQL_USERNAME = 'narr';
export const POSTGRESQL_URI =
`postgres:\/\/${POSTGRESQL_USERNAME}@${DOCKER_MACHINE_IP}:5432/todo_db`;

export default {
  NODE_ENV,
  PORT,
  POSTGRESQL_URI
};
