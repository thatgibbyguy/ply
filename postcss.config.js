module.exports = (ctx) => {
  const plugins = [require('autoprefixer')];
  const file = String(ctx.file || ctx.from || ctx.options?.from || '');

  if (file.includes('.min.')) {
    plugins.push(
      require('cssnano')({
        preset: ['default', {
          discardComments: { removeAll: true },
        }],
      })
    );
  }

  return { plugins };
};
