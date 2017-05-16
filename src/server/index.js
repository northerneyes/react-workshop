require('babel-register')({
  presets: [
    'react',
    ['env', { targets: { node: true } }],
  ],
});

require('./main');
