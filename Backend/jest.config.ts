export default {
  clearMocks: true,
  roots: ['<rootDir>'],
  testEnvironment: 'node',
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
