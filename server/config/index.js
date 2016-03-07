const env = process.env;
export const NODE_ENV = env.NODE_ENV;
export const PORT = env.PORT || 3000;
export let POSTGRESQL_URI;
export let REDIS_URL;

if (NODE_ENV === 'docker') {
  POSTGRESQL_URI = `postgres://${env.POSTGRES_ENV_POSTGRES_USER}@postgres:5432/${env.WRE_POSTGRES_ENV_POSTGRES_DB}`;
  REDIS_URL = 'redis://redis:6379';
} else if (env.DYNO) { // HEROKU
  POSTGRESQL_URI = env.DATABASE_URL;
  REDIS_URL = env.REDIS_URL;
} else {
  POSTGRESQL_URI = 'postgres://narr@192.168.99.100:5432/todo_db';
  REDIS_URL = 'redis://192.168.99.100:6379';
}

export default {
  NODE_ENV,
  PORT,
  POSTGRESQL_URI,
  REDIS_URL
};
