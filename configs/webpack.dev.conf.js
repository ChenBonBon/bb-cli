const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const webpackBaseConfig = require('./webpack.base.conf');

const devConfig = merge(webpackBaseConfig, {
	mode: 'development',
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		host: 'localhost',
		port: 8000,
		open: 'Google Chrome',
		inline: true,
		hot: true,
		publicPath: '/',
		historyApiFallback: true,
		stats: 'minimal',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		chunkFilename: '[name].async.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader?cacheDirectory',
			},
			{
				test: /\.css$/,
				use: [
					'css-hot-loader',
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
					'css-hot-loader',
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
	devtool: 'eval-cheap-module-source-map',
	optimization: {
		splitChunks: {
			cacheGroups: {
				styles: {
					name: 'styles',
					test: /\.(css|less)/,
					chunks: 'all',
					enforce: true,
				},
			},
		},
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
});

module.exports = new Promise((resolve, reject) => {
	portfinder.basePort = process.env.PORT || devConfig.devServer.port;
	portfinder.getPort((err, port) => {
		if (err) {
			reject(err);
		} else {
			process.env.PORT = port;
			devConfig.devServer.port = port;

			devConfig.plugins.push(
				new FriendlyErrorsWebpackPlugin({
					compilationSuccessInfo: {
						messages: [`You application is running here http://localhost:${port}`],
					},
				})
			);

			resolve(devConfig);
		}
	});
});
