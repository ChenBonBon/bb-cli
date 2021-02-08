const path = require('path');
const webpack = require('webpack');
const ProgressBar = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'src', 'index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	resolve: {
		alias: {
			'@src': path.resolve(__dirname, './src'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@common': path.resolve(__dirname, './src/common'),
			'@components': path.resolve(__dirname, './src/components'),
			'@e2e': path.resolve(__dirname, './src/e2e'),
			'@layouts': path.resolve(__dirname, './src/layouts'),
			'@locales': path.resolve(__dirname, './src/locales'),
			'@models': path.resolve(__dirname, './src/models'),
			'@routes': path.resolve(__dirname, './src/routes'),
			'@services': path.resolve(__dirname, './src/services'),
			'@utils': path.resolve(__dirname, './src/utils'),
		},
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'index.ejs'),
			filename: 'index.html',
			hash: true,
		}),
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, 'public'),
			},
		]),
		new ProgressBar({
			format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
			clear: false,
		}),
		new webpack.ProvidePlugin({
			React: 'react',
			$: 'jquery',
			jQuery: 'jquery',
			_: 'lodash',
		}),
		new webpack.DllReferencePlugin({
			context: path.resolve(__dirname, 'public/dll'),
			manifest: require('./public/dll/manifest.json'),
		}),
	],
	node: {
		fs: 'empty',
		module: 'empty',
	},
};
