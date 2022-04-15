import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import webpack from "webpack";

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');
const env = process.env.WEBPACK_ENV;

let outputFile;
let devTool;
let cssPath;
let isDev;

if(env === 'development'){
    outputFile = 'js/[name].min.js';
    devTool = 'eval';
    cssPath = 'css/[name].min.css';
    isDev = true;
} else {
    outputFile = 'js/[name]-[fullhash].min.js';
    devTool = 'source-map';
    cssPath = 'css/[name]-[contenthash].min.css';
    isDev = false
}

const commonConfig = {
    devServer: {
        host: '0.0.0.0',
        port: 4004,
        client: {
          progress: true,
            logging: 'error'
        },
        open: true,
        historyApiFallback: true
    },
    mode: process.env.NODE_ENV || "development",
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    entry: ['@babel/polyfill', APP_DIR + '/index.tsx'],
    output: {
        path: BUILD_DIR,
        filename: outputFile,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js?/,
                include: APP_DIR,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: "ts-loader",
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"],
            },
        ]
    },
    devtool: devTool,
    plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			hash: true,
			title: 'Euler | React Base',
			favicon: APP_DIR + '/assets/images/favicon.svg',
			template: APP_DIR + '/index.html',
			minify: {
				html5: true,
				minifyJS: !isDev,
				collapseWhitespace: !isDev,
				minifyCSS: !isDev,
				removeEmptyAttributes: true,
				removeComments: !isDev
			},
			cache: true
		}),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        }),
        isDev === true ? false : new webpack.optimize.AggressiveMergingPlugin(),
        isDev === true ? false : new CompressionPlugin({
            filename: '[path][base].gz[query]',
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$|\.svg$/,
            threshold: 10240,
            minRatio: 0.7
        }),
    ].filter(Boolean)
};

export default commonConfig;
