const path = require('path');
const relative = require('relative');
const glob = require('glob');

const createMegaloTarget = require('@megalo/target')
const compiler = require('@megalo/template-compiler')

// plugins
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )

function resolve (dir) {
    return path.join(__dirname, '..', dir)
  }

function getEntry(rootSrc, gb = '/pages/**/main.ts') {
    let map = {};
    glob.sync(rootSrc + gb)
        .forEach(file => {
            const key = relative(rootSrc, file).replace('.ts', '');
            map[key] = file;
        })
    return map;
}

const appEntry = { app: resolve('./src/main.ts') }
const pagesEntry = getEntry(resolve('./src'))
const entry = Object.assign({}, appEntry, pagesEntry)
console.log(entry);
module.exports = {
    entry,
    output: {
        path: resolve('./dist'),
        filename: '[name].js',
    },
    target: createMegaloTarget({
        compiler: Object.assign(compiler, {}),
        platform: 'wechat',
    }),
    resolve:  {
        extensions: ['.js', '.vue', '.json', '.ts'],
        alias: {
            'vue': 'megalo',
            '@': resolve('./src')
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'all',
                    name: 'vendor',
                    priority: 10,
                },
                utils: {
                    chunks: 'all',
                    name: 'utils',
                    minSize: 0,
                    minChunks: 2,
                    maxInitialRequests: 5,
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                }]
            },
            {
                test: /[\.js/\.tsx?]$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                }]
            },
            // {
            //     test: /\.ts$/,
            //     exclude: /node_modules/,
            //     enforce: 'pre',
            //     loader: 'tslint-loader'
            // },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/,
                options: {
                  appendTsSuffixTo: [/\.vue$/],
                }
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].wxss',
        })
    ],
    mode: 'none'
}