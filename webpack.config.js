const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackMerge = require("webpack-merge");

const modeConfig = env => require(`./webpack/webpack.${env}`)(env);

module.exports = env => {
  return webpackMerge(
    {
      mode: env.NODE_ENV,

      plugins: [
        new CleanWebpackPlugin(),
        // use the html-webpack-template to setup the auto generated html file - useful when running devserver
        new HtmlWebpackPlugin({
          title: 'I. M. GREWT - The Fullstack Avenger App',
          inject: false,
          template: require('html-webpack-template'),
          appMountId: 'root',
          meta: [
            {
              name: 'description',
              content: 'Instantiates React Webpack TypeScript app, with choices for MySQL / MongoDB, GraphQL / Express, Redux / MobX'
            },
            {
              name: 'viewport',
              content: 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
            }
          ],
          mobile: true,
          lang: 'en-US',
          links: [
            'https://fonts.googleapis.com/css?family=Roboto',
            // {
            //   href: '/apple-touch-icon.png',
            //   rel: 'apple-touch-icon',
            //   sizes: '180x180'
            // },
            // {
            //   href: '/favicon-32x32.png',
            //   rel: 'icon',
            //   sizes: '32x32',
            //   type: 'image/png'
            // }
          ]
        })
      ],

      entry: {
        main: './src/client/index.tsx'
      },

      output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname + '/dist/client'),
        publicPath: '/'
      },

      devServer: {
        contentBase: path.resolve(__dirname + '/dist/client'),
        // proxy allows for same origin use of this server with api server
        proxy: {
          "/auth": "http://localhost:5000/",
          "/api": "http://localhost:5000/"
        },
        historyApiFallback: true,
        hot: true,
        port: 4000
      },

      resolve: {
        extensions: ['.ts', '.tsx', '.js']
      },

      module: {
        rules: [
          {
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'ts-loader'
              }
            ]
          },
          // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
          {
            enforce: 'pre',
            test: /\.js$/,
            loader: 'source-map-loader'
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
            ]
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
              'file-loader',
            ],
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
              'file-loader',
            ]
          }
        ]
      },

      optimization: {
        splitChunks: {
          chunks: 'all'
        },
        usedExports: true
      },

      resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        mainFields: ['module', 'browser', 'main'],
        alias: {
          components: path.resolve(__dirname + '/src/client/components'),
          core: path.resolve(__dirname + '/src/client/core'),
          resources: path.resolve(__dirname + '/src/client/resources'),
          utils: path.resolve(__dirname + '/src/client/utils')
        }
      }
    },

    modeConfig(env.NODE_ENV)
  );
};
