const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const portfinder = require('portfinder');

const config = {
	entry: ['react-hot-loader/patch', './src/index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.less$/i,
				use: [
					{ loader: 'style-loader' },
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: {
								localIdentName: '[path][name]__[local]',
							},
						},
					},
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								javascriptEnabled: true,
							},
						},
					},
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'react-dom': '@hot-loader/react-dom',
		},
	},
	devServer: {
		contentBase: './dist',
		open: 'Google Chrome',
		port: 8000,
		historyApiFallback: true,
		hot: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html',
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			openAnalyzer: false,
		}),
		new CleanWebpackPlugin(),
		new CopyPlugin({
			patterns: [{ from: './public', to: './' }],
		}),
		new AntdDayjsWebpackPlugin(),
	],
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
		},
	},
};

module.exports = new Promise((resolve, reject) => {
	portfinder.basePort = config.devServer.port;

	portfinder.getPort((err, port) => {
		if (err) {
			reject(err);
		} else {
			config.devServer.port = port;

			if (process.env.NODE_EVN === 'development' && config.devServer.hot) {
				config.output.filename = '[name].[hash].js';
			}

			resolve(config);
		}
	});
});
