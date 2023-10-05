// Define the ENV constant
export const ENV = {
  SERVER_HOST: 'http://localhost:1337',
  API_URL: 'http://localhost:1337/api',
  ENDPOINTS: {
    AUTH: {
      REGISTER: "auth/local/register",
      LOGIN: "auth/local"
    },
    LAYOUTS: 'layouts',
    COLLECTIONS: 'collections',
    USERS_ME: "users/me",
    USERS: 'users',
    CATEGORY: "categories",
    USER_LAYOUTS: "user-layouts",
    LIKED_LAYOUTS: "liked-layouts",
  },
  TOKEN: 'token'
}