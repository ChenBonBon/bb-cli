const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const HappyPack = require('happypack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const webpackBaseConfig = require('./webpack.base.conf');

module.exports = merge(webpackBaseConfig, {
	mode: 'production',
	output: {
		filename: '[name].[chunkhash:8].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		chunkFilename: '[name].[chunkhash:8].async.js',
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
	stats: {
		children: false,
		warningsFilter: (warn) => warn.indexOf('Conflicting order between:') > -1,
	},
	optimization: {
		minimize: true,
		minimizer: [
			new OptimizeCssAssetsPlugin({
				assetNameRegExp: /\.css$/g,
				cssProcessor: require('cssnano'),
				cssProcessorOptions: { discardComments: { removeAll: true } },
				canPrint: true,
			}),
			new TerserPlugin({
				parallel: 8,
				cache: true,
				sourceMap: false,
			}),
		],
		splitChunks: {
			chunks: 'all',
			minSize: 20000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		},
		runtimeChunk: true,
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HappyPack({
			id: 'babel',
			loaders: ['babel-loader?cacheDirectory'],
			threadPool: happyThreadPool,
		}),
		new webpack.HashedModuleIdsPlugin(),
		// new BundleAnalyzerPlugin({
		// 	analyzerMode: 'server',
		// 	analyzerHost: '127.0.0.1',
		// 	analyzerPort: 8888, // 运行后的端口号
		// 	reportFilename: 'report.html',
		// 	defaultSizes: 'parsed',
		// 	openAnalyzer: true,
		// 	generateStatsFile: false,
		// 	statsFilename: 'stats.json',
		// 	statsOptions: null,
		// 	logLevel: 'info',
		// }),
	],
});
