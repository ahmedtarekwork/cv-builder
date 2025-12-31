export const auth = {
  currentUser: { uid: "test-uid" },
};

export const serverTimestamp = jest.fn(() => "mock-timestamp");
export const initializeApp = jest.fn(() => ({}));
export const getApp = jest.fn(() => ({}));
export const getApps = jest.fn(() => []);
export const getAuth = jest.fn(() => auth);
export const getFirestore = jest.fn(() => ({
  collection: jest.fn(),
}));
export const getStorage = jest.fn(() => ({}));
export const collection = jest.fn(() => ({
  withConverter: jest.fn(),
}));

const mocks = {
  serverTimestamp,
  getAuth,
  getStorage,
  getApps,
  initializeApp,
  getApp,
  getFirestore,
  collection,
};

export default mocks;
