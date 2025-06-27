const BASE_URL = "http://localhost:3000/api";

const api = {
  users: {
    list: `${BASE_URL}/users`,
    create: `${BASE_URL}/users`,
    update: (id) => `${BASE_URL}/users/${id}`,
    delete: (id) => `${BASE_URL}/users/${id}`,
  },
  roles: {
    list: `${BASE_URL}/roles`,
    create: `${BASE_URL}/roles`,
    update: (id) => `${BASE_URL}/roles/${id}`,
    delete: (id) => `${BASE_URL}/roles/${id}`,
  },
  permissions: {
    list: `${BASE_URL}/permissions`,
    create: `${BASE_URL}/permissions`,
    update: (id) => `${BASE_URL}/permissions/${id}`,
    delete: (id) => `${BASE_URL}/permissions/${id}`,
  },
  hierarchy: {
    list: `${BASE_URL}/hierarchy`,
    create: `${BASE_URL}/hierarchy`,
    update: (id) => `${BASE_URL}/hierarchy/${id}`,
    delete: (id) => `${BASE_URL}/hierarchy/${id}`,
  },
};

export default api;
