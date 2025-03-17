const nextJest = require('next/jest')

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
const config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    // Add more setup options before each test is run
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '^app/(.*)$': ['<rootDir>/src/app/$1'],
        '^components$': ['<rootDir>/src/components'],
        '^components/(.*)$': ['<rootDir>/src/components/$1'],
        '^entities/(.*)$': ['<rootDir>/src/entities/$1'],
        '^features/(.*)$': ['<rootDir>/src/features/$1'],
        '^pages/(.*)$': ['<rootDir>/src/pages/$1'],
        '^shared/(.*)$': ['<rootDir>/src/shared/$1'],
        '^widgets/(.*)$': ['<rootDir>/src/widgets/$1'],
        '^__mocks__/(.*)$': ['<rootDir>/src/__mocks__/$1'],
    },
    modulePathIgnorePatterns : ['test-const'],
    restoreMocks: true,
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config)
