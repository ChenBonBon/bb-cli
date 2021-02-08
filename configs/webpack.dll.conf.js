const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const theme = require('./src/theme');

module.exports = {
	entry: {
		vendor: [
			'react',
			'react-dom',
			'antd',
			'antd-password-input-strength',
			'jquery',
			'lodash',
			'lodash-decorators',
		],
	},
	output: {
		filename: '[name].dll.js',
		path: path.resolve(__dirname, 'public/dll'),
		library: '[name]_dll_[hash]',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [path.resolve(__dirname, 'src')],
				use: ['happypack/loader?id=babel'],
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
				],
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: true,
							localIdentName: '[name]_[local]-[hash:base64:5]',
						},
					},
					{
						loader: 'less-loader',
						options: {
							javascriptEnabled: true,
							modifyVars: theme,
						},
					},
				],
				exclude: /node_modules/,
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: 'less-loader',
						options: {
							javascriptEnabled: true,
							modifyVars: theme,
						},
					},
				],
				exclude: /src/,
			},
			{
				test: /\.(png|svg|jpg|gif|ttf)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							outputPath: './assets/',
						},
					},
				],
			},
			{
				test: /\.woff2$/,
				loader: 'url-loader',
				options: { limit: 10000, mimetype: 'application/font-woff2' },
			},
			{
				test: /\.woff$/,
				loader: 'url-loader',
				options: { limit: 10000, mimetype: 'application/font-woff' },
			},
			{
				test: /\.(ttf|eot|otf)$/,
				loader: 'file-loader',
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new webpack.DllPlugin({
			context: path.resolve(__dirname, 'public/dll'),
			name: '[name]_dll_[hash]',
			path: path.resolve(__dirname, 'public/dll', 'manifest.json'),
		}),
		new HappyPack({
			id: 'babel',
			loaders: ['babel-loader?cacheDirectory'],
			threadPool: happyThreadPool,
		}),
	],
};
