import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./helper/jest.setup.ts'],
  sandboxInjectedGlobals: [
    'Math',
  ],
  testEnvironment: '@askui/jest-allure-circus',
};

// eslint-disable-next-line import/no-default-export
export default config;
