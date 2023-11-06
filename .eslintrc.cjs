module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    '@nuxt/eslint-config',
  ],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages', {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
