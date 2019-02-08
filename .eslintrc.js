const strictMode = process.env.ESLINT_STRICT === 'true';

module.exports = {
  root: true,
  env: {
    browser: true,
    mocha: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['airbnb-base', 'prettier', 'plugin:vue/recommended'],
  plugins: ['import', 'prettier', 'chai-friendly', 'mocha', 'eslint-comments', 'vue'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        tabWidth: 2,
        printWidth: 100,
        trailingComma: 'all',
      },
    ],
    'valid-jsdoc': [
      1,
      {
        prefer: {
          returns: 'return',
        },
        preferType: {
          String: 'string',
          Number: 'number',
          object: 'Object',
          array: 'Array',
          function: 'Function',
          Boolean: 'boolean',
          bool: 'boolean',
        },
        requireReturn: false,
        requireParamDescription: false,
        requireReturnDescription: false,
      },
    ],

    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'import/no-anonymous-default-export': [
      'error',
      {
        allowArray: true,
        allowLiteral: true,
        allowObject: true,
      },
    ],

    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],

    'no-unused-expressions': 0,
    'chai-friendly/no-unused-expressions': 2,

    'mocha/no-exclusive-tests': 'error',
    'eslint-comments/disable-enable-pair': 'error',
    'eslint-comments/no-duplicate-disable': 'error',
    'eslint-comments/no-unlimited-disable': 'error',
    'eslint-comments/no-unused-disable': 'error',
    'eslint-comments/no-unused-enable': 'error',
    'max-statements': ['warn', 30],
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
    'max-lines': ['warn'],
    'multiline-comment-style': ['error', 'starred-block'],
    'no-debugger': [strictMode ? 'error' : 'off'],

    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'vue/require-default-prop': 'off',
    'vue/html-indent': [
      'error',
      2,
      {
        baseIndent: 0,
        ignores: [],
      },
    ],
  },
};
