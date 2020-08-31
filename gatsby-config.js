module.exports = {
  plugins: [
    // Build plugins
    {
      resolve: 'gatsby-plugin-emotion',
      options: {
        hoist: true,
        sourceMap: true,
      },
    },
    {
      resolve: 'dist',
      options: {
        fonts: [
          {
            family: 'Roboto',
            variants: [
              '400',
              '400i',
              '700',
              '700i',
            ],
            subsets: [
              'latin-ext',
            ],
          },
        ],
      },
    },
  ],
};
