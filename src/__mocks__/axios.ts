// Mock axios for Jest tests
const axios = {
  get: jest.fn(() => Promise.resolve({ data: '' })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
  defaults: {
    headers: {}
  }
};

export default axios;