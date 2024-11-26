export default {
  clearMocks: true,
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  runner: 'groups',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        isolatedModules: true,
      },
    ],
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
