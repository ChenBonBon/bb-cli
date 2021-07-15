const fs = require('fs');
const chalk = require('chalk');
const scripts = require('../configs/scripts.json');
const dependencies = require('../configs/dependencies.json');
const devDependencies = require('../configs/devDependencies.json');
const child_process = require('child_process');
const path = require('path');

const init = function (options) {
	const { name } = options;
	if (fs.existsSync(name)) {
		console.log(chalk.red('Project is exist.'));
		process.stdin.pause();
	} else {
		fs.mkdirSync(name);
		process.chdir(name);
		writeConfigs(options);
		process.stdin.pause();
	}
};

const writePackageJson = function (options) {
	const packageJson = Object.assign(options, {
		scripts,
		dependencies,
		devDependencies,
	});
	fs.writeFileSync('package.json', JSON.stringify(packageJson, null, '\t'));
};

const writeConfigs = function (options) {
	const { name } = options;
	writePackageJson(options);

	child_process.spawnSync('cp', ['-r', path.resolve(__dirname, '../configs/src'), path.resolve(__dirname, 'src')]);
	child_process.spawnSync('cp', [
		'-r',
		path.resolve(__dirname, '../configs/public'),
		path.resolve(__dirname, 'public'),
	]);
	child_process.spawnSync('cp', [
		path.resolve(__dirname, '../configs/.babelrc'),
		path.resolve(__dirname, '.babelrc'),
	]);
	child_process.spawnSync('cp', [
		path.resolve(__dirname, '../configs/.gitignore'),
		path.resolve(__dirname, '.gitignore'),
	]);
	child_process.spawnSync('cp', [
		path.resolve(__dirname, '../configs/.prettierignore'),
		path.resolve(__dirname, '.prettierignore'),
	]);
	child_process.spawnSync('cp', [
		path.resolve(__dirname, '../configs/.prettierrc'),
		path.resolve(__dirname, '.prettierrc'),
	]);
	child_process.spawnSync('cp', [
		path.resolve(__dirname, '../configs/webpack.config.js'),
		path.resolve(__dirname, 'webpack.config.js'),
	]);

	fs.writeFileSync('README.md', `# ${name}\r\n\r\n`);
	fs.appendFileSync('README.md', fs.readFileSync(path.resolve(__dirname, '../configs/README.md')));
	fs.writeFileSync('README-zh_CN.md', `# ${name}\r\n\r\n`);
	fs.appendFileSync('README-zh_CN.md', fs.readFileSync(path.resolve(__dirname, '../configs/README-zh_CN.md')));
};

module.exports = init;
