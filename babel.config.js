module.exports = (api) => {
  const presets = [
    [
      'babel-preset-gatsby',
      {
        targets: {
          node: api.env('production') ? 6 : 'current',
        },
      },
    ],
  ];

  return { presets };
};
