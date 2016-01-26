const env = process.env;
export const NODE_ENV = env.NODE_ENV;
export const PORT = env.PORT || 3000;

export default {
  NODE_ENV,
  PORT
};
