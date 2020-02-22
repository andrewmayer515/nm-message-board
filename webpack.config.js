const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = env => {
  const devtool = env.NODE_ENV !== 'production' ? 'inline-source-map' : '';
  return {
    entry: './src/client/public/index.js',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './src/client/public/index.html',
        filename: './index.html',
      }),
    ],
    devServer: {
      proxy: {
        '/api': 'http://localhost:5000',
      },
    },
    devtool,
  };
};
